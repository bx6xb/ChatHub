import { Dispatch } from "redux"
import { setError } from "../store/appReducer/appReducer"
import { useAppDispatch } from "../store/store"

export const errorHandler = (dispatch: Dispatch, message: string) => {
  dispatch(setError(message))
}
export const networkErrorHandler = (dispatch: Dispatch) => {
  dispatch(setError("Network error"))
}
