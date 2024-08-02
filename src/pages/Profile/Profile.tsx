import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import s from './Profile.module.scss'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import { authSelectors } from '../../store/authReducer'
import { profileSelectors } from '../../store/profileReducer'
import { randomProfileBg } from '../../utils/randomProfileBg'
import { generatePosts } from '../../store/profileReducer/profileReducer'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ProfileCard } from './ProfileCard/ProfileCard'
import { MyPosts } from './MyPosts/MyPosts'
import { Flex } from 'antd'
import { Loading } from '../../components/Loading/Loading'
import {
  getProfileStatus,
  getUserProfile
} from '../../store/profileReducer/asyncActions'
import { useTranslation } from 'react-i18next'
import { Languages } from '../../utils/randomPosts'

export const Profile = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(profileSelectors.selectUserProfile)
  const authorizedUserId = useAppSelector(authSelectors.selectId)!

  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { i18n } = useTranslation()

  // local state
  const [profileBg] = useState<string>(randomProfileBg())

  // get uri params from url
  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId! // define id of user

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
  }, [userId]) // get data for profile

  useEffect(() => {
    dispatch(generatePosts(i18n.language as Languages))
  }, [i18n.language]) // generate posts

  // loading while fetching data
  if (!userProfile) {
    return <Loading />
  }

  return (
    <>
      <img src={profileBg} alt="profile background" className={s.profileBg} />

      <Flex vertical gap={40} className={s.profileWrapper}>
        <ProfileCard />
        <ProfileInfo />
        <MyPosts />
      </Flex>
    </>
  )
})
