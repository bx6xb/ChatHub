import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import s from './Loading.module.css'

export const Loading = () => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: '60px' }} spin />}
      className={s.loading}
    />
  )
}
