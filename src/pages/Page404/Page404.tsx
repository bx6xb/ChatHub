import { Button, ConfigProvider, Result } from 'antd'
import { Colors } from '../../styles/Colors'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

export const Page404 = withAuthRedirect(() => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: Colors.primary,
          colorTextDescription: Colors.white
        }
      }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </ConfigProvider>
  )
})
