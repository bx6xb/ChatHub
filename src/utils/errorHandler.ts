import { Dispatch } from "redux"
import { setError } from "../store/appReducer/appReducer"

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(setError(message))
}
export const networkErrorHandler = (dispatch: Dispatch) => {
  dispatch(setError("Network error"))
}
