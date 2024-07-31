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
import { setUserPhoto } from '../../store/authReducer/authReducer'
import userDefaultPhoto from '../../assets/images/userDefaultPhoto.png'
import {
  getProfileStatus,
  getUserProfile
} from '../../store/profileReducer/asyncActions'

export const Profile = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(profileSelectors.selectUserProfile)
  const authorizedUserId = useAppSelector(authSelectors.selectId)!

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [profileBg] = useState<string>(randomProfileBg())

  // get uri params from url
  const urlParams = useParams<UrlParams>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId! // define id of user

  useEffect(() => {
    // get authorized user data to set user photo for header pop over
    dispatch(getUserProfile(authorizedUserId)).then(data => {
      if (getUserProfile.fulfilled.match(data)) {
        const userPhoto = data.payload.photos.large || userDefaultPhoto
        dispatch(setUserPhoto(userPhoto))
      }
    })
    dispatch(getProfileStatus(authorizedUserId))
  }, [])

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
    dispatch(generatePosts())
  }, [userId]) // get data for profile

  // redirect
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

// types
type UrlParams = {
  id: string
}
