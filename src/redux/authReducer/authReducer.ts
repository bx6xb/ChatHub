import { UserDataAuthDomain, authAPI } from "../../api/api"
import { Thunk } from "../store"

// initial state
export const initialState: UserDataAuthState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

// reducer
export const authReducer = (
  state: UserDataAuthState = initialState,
  action: AuthReducerAction
): UserDataAuthState => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.userData,
        isAuth: true,
      }
    default:
      return state
  }
}

// actions
export const setUserDataAC = (userData: UserDataAuthDomain) =>
  ({
    type: "SET_USER_DATA",
    userData,
  } as const)

// thunks
export const setUserDataTC = (): Thunk<AuthReducerAction> => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setUserDataAC(res.data.data))
    }
  })
}

// types
export type UserDataAuthState = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
export type AuthReducerAction = ReturnType<typeof setUserDataAC>
