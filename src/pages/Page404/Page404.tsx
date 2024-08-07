import { ConfigProvider, Result } from 'antd'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Page404Theme } from './Page404Theme'
import { useTranslation } from 'react-i18next'

const Page404 = withAuthRedirect(() => {
  // localization
  const { t } = useTranslation()

  return (
    <ConfigProvider theme={Page404Theme}>
      <Result status="404" title="404" subTitle={t('Page404_text')} />
    </ConfigProvider>
  )
})

export default Page404
