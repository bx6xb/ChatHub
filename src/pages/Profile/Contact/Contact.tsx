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
import { ContactValues } from '../../../api/api'

const contactIcons = {
  github: <GithubOutlined />,
  vk: <FacebookOutlined />,
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
    <Flex gap={5}>
      {contactIcons[contact]}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{ color: '#ffaa00', textDecoration: 'underline' }}>
        {contact}
      </a>
    </Flex>
  )
}

// types
type ContactProps = {
  contact: ContactValues
  link: string
}
