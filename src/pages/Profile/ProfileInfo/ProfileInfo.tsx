import { Flex, Typography } from 'antd'
import { useAppSelector } from '../../../utils/reduxUtils/reduxUtils'
import { ReactElement } from 'react'
import { Contact } from './Contact/Contact'
import s from './ProfileInfo.module.scss'
import { ContactValues } from '../../../api/types'
import { selectUserProfile } from '../../../store/profile/selectors'
import { t } from 'i18next'

export const ProfileInfo = () => {
  // get data from the state
  const userProfile = useAppSelector(selectUserProfile)

  if (!userProfile) {
    return null
  }

  // jsx variables
  let mappedContacts: ReactElement[] = Object.entries(userProfile.contacts)
    .filter(c => c[1])
    .map(([contact, link]) => (
      <Contact key={contact} contact={contact as ContactValues} link={link!} />
    ))

  // remove space between profile card and posts if information is missing
  const shouldShow =
    userProfile.aboutMe ||
    userProfile.lookingForAJob ||
    userProfile.lookingForAJobDescription ||
    mappedContacts.length

  return shouldShow ? (
    <Flex wrap gap={5}>
      <div className={s.profileInfo}>
        {userProfile.aboutMe && (
          <Typography.Paragraph>
            <b>{t('ProfileInfo_about_me')}:</b> {userProfile.aboutMe}
          </Typography.Paragraph>
        )}
        {userProfile.lookingForAJob && (
          <Typography.Paragraph>
            {t('ProfileInfo_looking_for_a_job')}
          </Typography.Paragraph>
        )}
        {userProfile.lookingForAJobDescription && (
          <Typography.Paragraph>
            <b>{t('ProfileInfo_job_description')}:</b>{' '}
            {userProfile.lookingForAJobDescription}
          </Typography.Paragraph>
        )}
      </div>

      {!!mappedContacts.length && (
        <Flex vertical gap={3} className={s.contacts}>
          <Typography.Title level={5}>
            {t('ProfileInfo_contacts')}
          </Typography.Title>
          {mappedContacts}
        </Flex>
      )}
    </Flex>
  ) : null
}
