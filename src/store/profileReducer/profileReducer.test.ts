import { getUserProfile, setProfileStatus } from "./asyncActions"
import { addPost, profileReducer } from "./profileReducer"
import { ProfileState } from "./types"

let state: ProfileState

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    userProfile: {},
    profileStatus: "love zenow",
  } as ProfileState
})

// tests
test("new post should be added", () => {
  const message = "zenow"
  const newState = profileReducer(state, addPost({ message }))

  expect(newState).not.toBe(state)
  expect(newState.posts.length).toBe(5)
  expect(newState.posts[0].message).toBe(message)
})
test("user profile should be set", () => {
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
      mainLink: null,
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: "Rusya",
    userId: 31140,
    photos: { small: null, large: null },
  }

  const newState = profileReducer(state, getUserProfile.fulfilled(userProfile, "requestId", 2))

  expect(newState).not.toBe(state)
  expect(newState.userProfile).toBe(userProfile)
})
test("profile status should be set", () => {
  const profileStatus = "new status"
  const newState = profileReducer(
    state,
    setProfileStatus.fulfilled(profileStatus, "requestId", profileStatus)
  )

  expect(newState).not.toBe(state)
  expect(newState.profileStatus).toBe(profileStatus)
})
