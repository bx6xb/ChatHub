import { TypedUseSelectorHook } from "react-redux"
import { AppRootState } from "../store/store"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch: () => ThunkDispatch<AppRootState, unknown, AnyAction> = () =>
  useDispatch()
