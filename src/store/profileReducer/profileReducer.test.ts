import { Photos } from '../../api/types'
import {
  getUserProfile,
  setProfilePhoto,
  setProfileStatus
} from './asyncActions'
import {
  addPost,
  changePostData,
  changeProfileStatus,
  generatePosts,
  profileReducer
} from './profileReducer'
import { ProfileState } from './types'

let state: ProfileState

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 0 },
      {
        id: 2,
        message: "It's my first post",
        likesCount: 11,
        dislikesCount: 1
      },
      { id: 3, message: 'Blabla', likesCount: 10, dislikesCount: 2 },
      { id: 4, message: 'Dada', likesCount: 9, dislikesCount: 3 }
    ],
    userProfile: {},
    profileStatus: 'love zenow'
  } as ProfileState
})

// tests
test('posts should be generated', () => {
  const newState = profileReducer(state, generatePosts('en'))

  expect(newState.posts.length).toBeGreaterThanOrEqual(1)
  expect(newState.posts.length).toBeLessThanOrEqual(7)
})

test('new post should be added', () => {
  const message = 'zenow'

  const newState = profileReducer(state, addPost(message))

  expect(newState).not.toBe(state)
  expect(newState.posts.length).toBe(5)
  expect(newState.posts[0].message).toBe(message)
})

test('post data should be changed', () => {
  const likesCount = 12
  const dislikesCount = 0

  const newState = profileReducer(
    state,
    changePostData({ id: 2, data: { likesCount, dislikesCount } })
  )

  expect(newState.posts[1].likesCount).toBe(likesCount)
  expect(newState.posts[1].dislikesCount).toBe(dislikesCount)
})

test('profile status should be changed', () => {
  const status = 'status'

  const newState = profileReducer(state, changeProfileStatus(status))

  expect(newState.profileStatus).toBe(status)
})

test('user profile should be set', () => {
  const userProfile = {
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

  const newState = profileReducer(
    state,
    getUserProfile.fulfilled(userProfile, 'requestId', 2)
  )

  expect(newState).not.toBe(state)
  expect(newState.userProfile).toBe(userProfile)
})

test('profile photo should be set', () => {
  const photos: Photos = { large: 'url1', small: 'url2' }
  const file = new File(['content'], 'example.txt', {
    type: 'text/plain'
  })

  const newState = profileReducer(
    state,
    setProfilePhoto.fulfilled(photos, 'requestId', file)
  )

  expect(newState.userProfile?.photos).toEqual(photos)
})
