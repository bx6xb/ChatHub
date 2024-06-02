import { setUserData } from "../authReducer/authReducer"
import { appReducer } from "./appReducer"

test("isAppInitialized value should be changed", () => {
  const newState = appReducer(
    { isAppInitialized: false },
    setUserData.fulfilled(
      { email: "example@gmail.com", id: 1, login: "login", isAuth: true },
      "requestId"
    )
  )

  expect(newState.isAppInitialized).toBeTruthy()
})
