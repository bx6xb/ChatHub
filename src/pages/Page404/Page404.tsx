import { Button, ConfigProvider, Result } from 'antd'
import { Colors } from '../../styles/Colors'

export const Page404 = () => {
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
}
