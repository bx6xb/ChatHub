import { Dispatch } from 'redux'
import { setAppMessage, setIsError } from '../store/appReducer/appReducer'
import { t } from 'i18next'

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(setIsError(true))
  dispatch(setAppMessage(message))
}
export const networkErrorHandler = (dispatch: Dispatch) => {
  dispatch(setIsError(true))
  dispatch(setAppMessage(t('network_error')))
}
export const resetAppMessageAndError = (dispatch: Dispatch) => {
  dispatch(setIsError(false))
  dispatch(setAppMessage(null))
}
