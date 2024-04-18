export type UserDataAuthStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

export const initialState: UserDataAuthStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

type AuthReducerActionType = ReturnType<typeof setUserDataAC>

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

export const setUserDataAC = (userData: UserDataAuthStateType) =>
  ({
    type: "SET_USER_DATA",
    userData,
  } as const)
