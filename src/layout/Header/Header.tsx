import { useAppSelector } from '../../utils/reduxUtils'
import { authSelectors } from '../../store/authReducer'
import userDefaultPhoto from '../../assets/images/userDefaultPhoto.png'
import { Avatar, Flex, Layout, Popover } from 'antd'
import { HeaderPopoverContent } from './HeaderPopoverContent/HeaderPopoverContent'
import s from './Header.module.scss'
import { Icon } from '../../components/Icon/Icon'

export const Header = () => {
  // get data from the state
  const isAuth = useAppSelector(authSelectors.selectIsAuth)
  const authorizedUserAvatar = useAppSelector(
    authSelectors.selectAuthorizedUserPhoto
  )

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
