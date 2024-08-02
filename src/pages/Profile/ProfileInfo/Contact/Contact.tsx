import {
  LinkOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LayoutOutlined,
  TwitterOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Flex } from 'antd'
import { Icon } from '../../../../components/Icon/Icon'
import s from './Contact.module.scss'
import { ContactValues } from '../../../../api/types'

type ContactProps = {
  contact: ContactValues
  link: string
}

const contactIcons = {
  github: <GithubOutlined />,
  vk: <Icon iconId="vk" width="12.5" height="12.5" viewBox="0 0 360 360" />,
  facebook: <FacebookOutlined />,
  instagram: <InstagramOutlined />,
  twitter: <TwitterOutlined />,
  website: <LayoutOutlined />,
  youtube: <YoutubeOutlined />,
  mainLink: <LinkOutlined />
} as {
  [key in ContactValues]: JSX.Element
}

export const Contact = ({ contact, link }: ContactProps) => {
  return (
    <Flex gap={5} align="center">
      {contactIcons[contact]}
      <a href={link} target="_blank" rel="noreferrer" className={s.link}>
        {contact}
      </a>
    </Flex>
  )
}
