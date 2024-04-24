import { useEffect } from "react"
import { Header } from "./Header"
import { useDispatch } from "react-redux"
import { UserDataAuthStateType, setUserDataTC } from "../../redux/authReducer/authReducer"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../redux/store"

export const HeaderContainer = () => {
  const state = useSelector<AppRootStateType, UserDataAuthStateType>((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserDataTC())
  }, [])

  return <Header isAuth={state.isAuth} login={state.login} />
}
