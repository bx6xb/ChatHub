import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import s from './Profile.module.scss'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ProfileCard } from './ProfileCard/ProfileCard'
import { MyPosts } from './MyPosts/MyPosts'
import { Flex } from 'antd'
import { Loading } from '../../components/Loading/Loading'
import {
  getProfileStatus,
  getUserProfile
} from '../../store/profile/asyncActions'
import { getRandomProfileBg } from '../../utils/randomData/getRandomProfileBg'
import { selectId } from '../../store/auth/selectors'
import { selectUserProfile } from '../../store/profile/selectors'

const Profile = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(selectUserProfile)
  const authorizedUserId = useAppSelector(selectId)!

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [profileBg] = useState<string>(getRandomProfileBg())

  // get uri params from url
  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId! // define id of user

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
  }, [userId]) // get data for profile

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

export default Profile
