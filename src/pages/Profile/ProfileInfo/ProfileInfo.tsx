import { Flex, Typography } from 'antd'
import { useAppSelector } from '../../../utils/reduxUtils'
import { profileSelectors } from '../../../store/profileReducer'
import { ReactElement } from 'react'
import { Contact } from './Contact/Contact'
import { ContactValues } from '../../../api/api'
import s from './ProfileInfo.module.scss'

export const ProfileInfo = () => {
  // get data from the state
  const userProfile = useAppSelector(profileSelectors.selectUserProfile)
  // for ts
  if (!userProfile) {
    return null
  }

  let mappedContacts: ReactElement[] = Object.entries(userProfile.contacts)
    .filter(c => c[1])
    .map(([contact, link]) => (
      <Contact key={contact} contact={contact as ContactValues} link={link!} />
    ))

  return (
    <Flex wrap>
      <div className={s.profileInfo}>
        {userProfile.aboutMe && (
          <Typography.Paragraph>
            <b>About me:</b> {userProfile.aboutMe}
          </Typography.Paragraph>
        )}
        {userProfile.lookingForAJob && (
          <Typography.Paragraph>{`I am looking for a job`}</Typography.Paragraph>
        )}
        {userProfile.lookingForAJobDescription && (
          <Typography.Paragraph>
            <b>Job description:</b> {userProfile.lookingForAJobDescription}
          </Typography.Paragraph>
        )}
      </div>

      {!!mappedContacts.length && (
        <Flex vertical gap={4} className={s.contacts}>
          <Typography.Title level={5}>Contacts</Typography.Title>
          {mappedContacts}
        </Flex>
      )}
    </Flex>
  )
}
