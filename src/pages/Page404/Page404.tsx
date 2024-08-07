import { ConfigProvider, Result } from 'antd'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { t } from 'i18next'
import { Page404Theme } from './Page404Theme'

const Page404 = withAuthRedirect(() => {
  return (
    <ConfigProvider theme={Page404Theme}>
      <Result status="404" title="404" subTitle={t('Page404_text')} />
    </ConfigProvider>
  )
})

export default Page404
