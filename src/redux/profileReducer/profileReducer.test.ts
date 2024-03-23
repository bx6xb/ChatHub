import { ProfilePageType, addPostAC, profileReducer, updateNewPostAC } from "./profileReducer"

let state: ProfilePageType

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    newPostText: "Yan Turnt",
  }
})

test("new post should be added", () => {
  const action = addPostAC()
  const newState = profileReducer(state, action)

  expect(newState).not.toBe(state)
  expect(newState).not.toEqual(state)
  expect(newState.posts.length).toBe(5)
  expect(newState.newPostText).toBe("")
})

test("new post text should be updated", () => {
  let postText = "new post"

  const action = updateNewPostAC(postText)
  const newState = profileReducer(state, action)

  expect(newState).not.toBe(state)
  expect(newState).not.toEqual(state)
  expect(newState.posts.length).toBe(4)
  expect(newState.newPostText).toBe(postText)
})
