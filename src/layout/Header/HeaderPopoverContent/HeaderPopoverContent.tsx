import { Button, Divider, Flex, Menu, Switch } from 'antd'
import { useAppDispatch } from '../../../utils/reduxUtils'
import { logout } from '../../../store/authReducer/asyncActions'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const HeaderPopoverContent = () => {
  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t, i18n } = useTranslation()

  // callbacks
  const logoutOnClick = () => {
    dispatch(logout())
  }
  const changeLanguage = (checked: boolean) => {
    i18n.changeLanguage(checked ? 'en' : 'ru')
  }

  return (
    <Flex vertical align="center">
      <Menu
        mode="vertical"
        items={[
          {
            label: (
              <Link to={'/profile'}>{t('HeaderPopoverContent_profile')}</Link>
            ),
            key: 'Profile',
            icon: <UserOutlined />
          },
          {
            label: (
              <Link to="/edit-profile">
                {t('HeaderPopoverContent_edit_profile')}
              </Link>
            ),
            key: 'Edit profile',
            icon: <EditOutlined />
          }
        ]}
      />
      <Switch
        checkedChildren="En"
        unCheckedChildren="Ru"
        defaultChecked={i18n.language === 'en'}
        onChange={changeLanguage}
      />
      <Divider />
      <Button onClick={logoutOnClick}>
        {t('HeaderPopoverContent_logout')}
      </Button>
    </Flex>
  )
}
