import { setUserData } from '../authReducer/asyncActions'
import { appReducer, setAppMessage, setIsError, slice } from './appReducer'

const initialState = slice.getInitialState()

test('isAppInitialized value should be changed', () => {
  const newState = appReducer(
    initialState,
    setUserData.fulfilled(
      { email: 'example@gmail.com', id: 1, login: 'login', isAuth: true },
      'requestId'
    )
  )

  expect(newState.isAppInitialized).toBeTruthy()
})

test('isError value should be changed', () => {
  const newState = appReducer(initialState, setIsError(true))

  expect(newState.isError).toBeTruthy()
})

test('app message should be changed', () => {
  const appMessage = 'Network error'
  const newState = appReducer(initialState, setAppMessage(appMessage))

  expect(newState.appMessage).toBe(appMessage)
})
