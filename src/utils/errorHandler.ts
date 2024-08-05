import { Dispatch } from 'redux'
import { addAppMessage, removeAppMessage } from '../store/appReducer/appReducer'
import { v4 } from 'uuid'

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(
    addAppMessage({
      id: v4(),
      message,
      isError: true
    })
  )
}
export const resetAppMessageAndError = (dispatch: Dispatch, id: string) => {
  dispatch(removeAppMessage(id))
}
