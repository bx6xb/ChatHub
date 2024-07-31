import { Dispatch } from 'redux'
import { setAppMessage, setIsError } from '../store/appReducer/appReducer'

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(setIsError(true))
  dispatch(setAppMessage(message))
}
export const networkErrorHandler = (dispatch: Dispatch) => {
  dispatch(setIsError(true))
  dispatch(setAppMessage('Network error'))
}
export const resetAppMessageAndError = (dispatch: Dispatch) => {
  dispatch(setIsError(false))
  dispatch(setAppMessage(null))
}
