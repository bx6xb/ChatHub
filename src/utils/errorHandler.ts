import { Dispatch } from 'redux'
import { setAppMessage, setIsError } from '../store/appReducer/appReducer'

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(setIsError(true))
  dispatch(setAppMessage(message))
}
export const resetAppMessageAndError = (dispatch: Dispatch) => {
  dispatch(setIsError(false))
  dispatch(setAppMessage(null))
}
