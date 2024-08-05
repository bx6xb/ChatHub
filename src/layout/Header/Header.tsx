import { useAppSelector } from '../../utils/reduxUtils/reduxUtils'
import userDefaultPhoto from '../../assets/images/userDefaultPhoto.png'
import { Avatar, Flex, Layout, Popover } from 'antd'
import { HeaderPopoverContent } from './HeaderPopoverContent/HeaderPopoverContent'
import s from './Header.module.scss'
import { Icon } from '../../components/Icon/Icon'
import {
  selectAuthorizedUserPhoto,
  selectIsAuth
} from '../../store/auth/selectors'

export const Header = () => {
  // get data from the state
  const isAuth = useAppSelector(selectIsAuth)
  const authorizedUserAvatar = useAppSelector(selectAuthorizedUserPhoto)

  return (
    <Layout.Header className={s.header}>
      <Flex
        justify={isAuth ? 'space-between' : 'center'}
        align="center"
        className={s.headerContent}
      >
        {/* logo */}
        <Icon iconId="logo" width="164" height="40" viewBox="0 0 82 20" />

        {/* Popover */}
        {isAuth && (
          <Popover content={HeaderPopoverContent} title="">
            <Avatar
              icon={
                <img
                  src={authorizedUserAvatar || userDefaultPhoto}
                  alt="avatar"
                />
              }
            />
          </Popover>
        )}
      </Flex>
    </Layout.Header>
  )
}
