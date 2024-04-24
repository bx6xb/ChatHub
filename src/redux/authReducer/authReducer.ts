import { UserDataAuthDomainType, authAPI } from "../../api/api"
import { ThunkType } from "../store"

// types
export type UserDataAuthStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
type AuthReducerActionType = ReturnType<typeof setUserDataAC>

// initial state
export const initialState: UserDataAuthStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

// reducer
export const authReducer = (
  state: UserDataAuthStateType = initialState,
  action: AuthReducerActionType
): UserDataAuthStateType => {
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
export const setUserDataAC = (userData: UserDataAuthDomainType) =>
  ({
    type: "SET_USER_DATA",
    userData,
  } as const)

// thunks
export const setUserDataTC = (): ThunkType<AuthReducerActionType> => (dispatch) => {
  authAPI.getAuth().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setUserDataAC(res.data.data))
    }
  })
}
