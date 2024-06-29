import s from "./Header.module.css"
import { Icon } from "../../components/Icon/Icon"
import { useAppDispatch, useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import { Container } from "../../components/Container/Container"
import { logout } from "../../store/authReducer/asyncActions"
import userDefaultPhoto from "../../assets/images/userDefaultPhoto.png"
import { profileSelectors } from "../../store/profileReducer"

export const Header = () => {
  const { isAuth, login } = useAppSelector(authSelectors.selectAuthState)
  const photo = useAppSelector(profileSelectors.selectPhoto)
  const dispatch = useAppDispatch()

  const logoutOnClick = () => {
    dispatch(logout())
  }

  return (
    <header className={s.headerWrapper}>
      <Container className={s.header}>
        <Icon iconId="logo" width="50" height="30" />

        <div className={s.loginBlock}>
          {isAuth && (
            <>
              <img src={photo || userDefaultPhoto} className={s.avatar} alt="avatar" />
              {login}
              <br />
              <button onClick={logoutOnClick}>Logout</button>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
