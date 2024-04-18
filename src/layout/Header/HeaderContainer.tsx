import { useEffect } from "react"
import { Header } from "./Header"
import axios from "axios"
import { useDispatch } from "react-redux"
import { UserDataAuthStateType, setUserDataAC } from "../../redux/authReducer/authReducer"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../redux/store"

type AuthMeResponseType = {
  resultCode: number
  messages: string[]
  data: UserDataAuthStateType
}

export const HeaderContainer = () => {
  const state = useSelector((state: AppRootStateType) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get<AuthMeResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.resultCode === 0) {
          dispatch(setUserDataAC(resp.data.data))
        }
        console.log(resp.data)
      })
  }, [])
  return <Header isAuth={state.isAuth} login={state.login} />
}
