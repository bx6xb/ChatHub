import { followAC, initialState, unfollowAC, usersReducer } from "./usersReducer"

test("user should be followed", () => {
  const userId = 2
  const newState = usersReducer(initialState, followAC(userId))

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[1].followed).toBeTruthy()
})

test("user should be unfollowed", () => {
  const userId = 1
  const newState = usersReducer(initialState, unfollowAC(userId))

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[0].followed).toBeFalsy()
})
