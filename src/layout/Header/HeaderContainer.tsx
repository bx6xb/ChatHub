import { useEffect } from "react"
import { Header } from "./Header"
import { useDispatch } from "react-redux"
import { setUserDataAC } from "../../redux/authReducer/authReducer"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../redux/store"
import { authAPI } from "../../api/api"

export const HeaderContainer = () => {
  const state = useSelector((state: AppRootStateType) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    authAPI.getAuth().then((resp) => {
      if (resp.data.resultCode === 0) {
        dispatch(setUserDataAC(resp.data.data))
      }
    })
  }, [])
  return <Header isAuth={state.isAuth} login={state.login} />
}
