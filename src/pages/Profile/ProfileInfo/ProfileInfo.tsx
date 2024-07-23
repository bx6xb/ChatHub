import { Flex, Typography } from 'antd'
import { useAppSelector } from '../../../utils/redexUtils'
import { profileSelectors } from '../../../store/profileReducer'
import { ReactElement } from 'react'
import { Contact } from './Contact/Contact'
import { ContactValues } from '../../../api/api'

export const ProfileInfo = () => {
  // get data from state
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
      <div style={{ width: '300px', marginBottom: '20px' }}>
        {userProfile.aboutMe && (
          <Typography.Paragraph style={{ margin: 0 }}>
            <b>About me:</b> {userProfile.aboutMe}
          </Typography.Paragraph>
        )}
        {userProfile.lookingForAJob && (
          <Typography.Paragraph
            style={{
              margin: 0
            }}
          >{`I am looking for a job`}</Typography.Paragraph>
        )}
        {userProfile.lookingForAJobDescription && (
          <Typography.Paragraph style={{ margin: 0 }}>
            <b>Job description:</b> {userProfile.lookingForAJobDescription}
          </Typography.Paragraph>
        )}
      </div>

      {!!mappedContacts.length && (
        <Flex vertical gap={4} style={{ width: '100px' }}>
          <Typography.Title level={5}>Contacts</Typography.Title>
          {mappedContacts}
        </Flex>
      )}
    </Flex>
  )
}
