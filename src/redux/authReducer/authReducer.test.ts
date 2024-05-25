import { authReducer, initialState, logout, setUserData } from "./authReducer"

test("user data should be set", () => {
  const userData = { id: 30880, login: "Yan_Turnt", email: "bx6xbchosen1@gmail.com", isAuth: true }

  const newState = authReducer(initialState, setUserData.fulfilled(userData, "requestId"))

  expect(newState).not.toBe(initialState)
  expect(newState.id).toBe(userData.id)
  expect(newState.login).toBe(userData.login)
  expect(newState.email).toBe(userData.email)
  expect(newState.isAuth).toBeTruthy()
})
test("user data should be deleted", () => {
  const state = { id: 30880, login: "Yan_Turnt", email: "bx6xbchosen1@gmail.com", isAuth: true }

  const newState = authReducer(state, logout.fulfilled({}, "requestiId"))

  expect(newState).not.toBe(initialState)
  expect(newState.id).toBe(null)
  expect(newState.login).toBe(null)
  expect(newState.email).toBe(null)
  expect(newState.isAuth).toBeFalsy()
})
