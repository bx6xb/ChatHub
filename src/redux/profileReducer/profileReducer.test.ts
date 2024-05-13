import {
  ProfilePageState,
  addPostAC,
  profileReducer,
  setUserProfileAC,
  updateNewPostAC,
} from "./profileReducer"

let state: ProfilePageState

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    newPostText: "Yan Turnt",
    userProfile: null,
    profileStatus: "love zenow",
  }
})

test("new post should be added", () => {
  const newState = profileReducer(state, addPostAC())

  expect(newState).not.toBe(state)
  expect(newState.posts.length).toBe(5)
  expect(newState.newPostText).toBe("")
})

test("new post text should be updated", () => {
  let postText = "new post"

  const newState = profileReducer(state, updateNewPostAC(postText))

  expect(newState).not.toBe(state)
  expect(newState.newPostText).toBe(postText)
})

test("user profile should be set", () => {
  let userProfile = {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null,
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: "Rusya",
    userId: 31140,
    photos: { small: null, large: null },
  }

  const newState = profileReducer(state, setUserProfileAC(userProfile))

  expect(newState).not.toBe(state)
  expect(newState.userProfile).toBe(userProfile)
})
