import { Photos, ProfileDomain } from '../../api/types'
import { getUserProfile, setProfilePhoto } from './asyncActions'
import {
  addPost,
  changePostData,
  changeProfileStatus,
  generatePosts,
  profileReducer,
  removePost
} from './reducer'

// variables
const initialState = {
  posts: [
    {
      id: 'id1',
      message: 'Hi, how are you?',
      likesCount: 12,
      dislikesCount: 0
    },
    {
      id: 'id2',
      message: "It's my first post",
      likesCount: 11,
      dislikesCount: 1
    },
    { id: 'id3', message: 'Blabla', likesCount: 10, dislikesCount: 2 },
    { id: 'id4', message: 'Dada', likesCount: 9, dislikesCount: 3 }
  ],
  userProfile: null,
  profileStatus: 'love zenow'
}
const userProfile: ProfileDomain = {
  aboutMe: null,
  contacts: {
    facebook: null,
    website: null,
    vk: null,
    twitter: null,
    instagram: null,
    youtube: null,
    github: null,
    mainLink: null
  },
  lookingForAJob: false,
  lookingForAJobDescription: null,
  fullName: 'Rusya',
  userId: 31140,
  photos: { small: null, large: null }
}

// tests
test('posts should be generated', () => {
  const newState = profileReducer(initialState, generatePosts('en'))

  expect(newState.posts.length).toBeGreaterThanOrEqual(1)
  expect(newState.posts.length).toBeLessThanOrEqual(7)
})

test('new post should be added', () => {
  const message = 'zenow'

  const newState = profileReducer(initialState, addPost(message))

  expect(newState).not.toBe(initialState)
  expect(newState.posts.length).toBe(5)
  expect(newState.posts[0].message).toBe(message)
})

test('post data should be changed', () => {
  const likesCount = 12
  const dislikesCount = 0

  const newState = profileReducer(
    initialState,
    changePostData({ id: 'id2', data: { likesCount, dislikesCount } })
  )

  expect(newState.posts[1].likesCount).toBe(likesCount)
  expect(newState.posts[1].dislikesCount).toBe(dislikesCount)
})

test('post should be removed', () => {
  const id = 'id3'
  const newState = profileReducer(initialState, removePost(id))

  const filteredPosts = newState.posts.filter(post => post.id !== id)

  expect(filteredPosts.length).toBe(3)
})

test('profile status should be changed', () => {
  const status = 'status'

  const newState = profileReducer(initialState, changeProfileStatus(status))

  expect(newState.profileStatus).toBe(status)
})

test('user profile should be set', () => {
  const newState = profileReducer(
    initialState,
    getUserProfile.fulfilled(userProfile, 'requestId', 2)
  )

  expect(newState).not.toBe(initialState)
  expect(newState.userProfile).toBe(userProfile)
})

test('profile photo should be set', () => {
  const photos: Photos = { large: 'url1', small: 'url2' }
  const file = new File(['content'], 'example.txt', {
    type: 'text/plain'
  })

  // firstly set user profile
  const transitState = profileReducer(
    initialState,
    getUserProfile.fulfilled(userProfile, 'requestId', 2)
  )

  const newState = profileReducer(
    transitState,
    setProfilePhoto.fulfilled(photos, 'requestId', file)
  )

  expect(newState.userProfile?.photos).toEqual(photos)
})
