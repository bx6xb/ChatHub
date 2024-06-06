import { setUserData } from "../authReducer/authReducer"
import { appReducer, setError } from "./appReducer"

test("isAppInitialized value should be changed", () => {
  const newState = appReducer(
    { isAppInitialized: false, error: null },
    setUserData.fulfilled(
      { email: "example@gmail.com", id: 1, login: "login", isAuth: true },
      "requestId"
    )
  )

  expect(newState.isAppInitialized).toBeTruthy()
})
test("error value should be changed", () => {
  const error = "network error"
  const newState = appReducer({ isAppInitialized: false, error: null }, setError(error))

  expect(newState.error).toBe(error)
})
