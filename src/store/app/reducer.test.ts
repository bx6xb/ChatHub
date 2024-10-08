import { getUserData } from '../auth/asyncActions'
import { appReducer, addAppMessage, slice } from './reducer'

const initialState = slice.getInitialState()

test('isAppInitialized value should be changed', () => {
  const newState = appReducer(
    initialState,
    getUserData.fulfilled(
      { email: 'example@gmail.com', id: 1, login: 'login', isAuth: true },
      'requestId'
    )
  )

  expect(newState.isAppInitialized).toBeTruthy()
})

test('app message should be changed', () => {
  const appMessage = {
    id: 'id1',
    isError: true,
    message: 'Nertwork error'
  }
  const newState = appReducer(initialState, addAppMessage(appMessage))

  expect(newState.appMessages[0]).toEqual(appMessage)
  expect(newState.appMessages[0].id).toBe(appMessage.id)
  expect(newState.appMessages[0].isError).toBeTruthy()
  expect(newState.appMessages[0].message).toBe(appMessage.message)
})
