import { setUserDataTC } from "../authReducer/authReducer"
import { Thunk } from "../store"

const initialState = {
  isAppInitialized: false,
}

export const appReducer = (state: AppState = initialState, action: AppReducerAction): AppState => {
  switch (action.type) {
    case "app/SET_INITIALIZED":
      return {
        ...state,
        isAppInitialized: action.isAppInitialized,
      }
    default:
      return state
  }
}

// actions
export const setInitializedAC = (isAppInitialized: boolean) =>
  ({
    type: "app/SET_INITIALIZED",
    isAppInitialized,
  } as const)

// thunks
export const initializeAppTC = (): Thunk => (dispatch) => {
  const authUserPromise = dispatch(setUserDataTC()).then((res) => {
    console.log(res)
  })

  Promise.all([authUserPromise]).then(() => {
    dispatch(setInitializedAC(true))
  })
}

// types
type AppState = typeof initialState
export type AppReducerAction = ReturnType<typeof setInitializedAC>
