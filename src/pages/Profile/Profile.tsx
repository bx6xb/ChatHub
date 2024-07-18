import { useParams, useSearchParams } from 'react-router-dom'
import { ReactElement, useEffect, useState } from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Post } from './Post/Post'
import { PostsForm } from './PostsForm'
import s from './Profile.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/redexUtils'
import { authSelectors } from '../../store/authReducer'
import { profileSelectors } from '../../store/profileReducer'
import {
  getProfileStatus,
  getUserProfile
} from '../../store/profileReducer/asyncActions'
import { randomProfileBg } from '../../utils/randomProfileBg'
import userDefaultPhoto from '../../assets/images/userDefaultPhoto.png'
import { Contact } from './Contact/Contact'
import { Avatar, Button, Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ContactValues } from '../../api/api'

export const Profile = withAuthRedirect(() => {
  const { userProfile, profileStatus } = useAppSelector(
    profileSelectors.selectProfileState
  )
  const authUserId = useAppSelector(authSelectors.selectId)
  const authorizedUserId = useAppSelector(authSelectors.selectId)
  const posts = useAppSelector(profileSelectors.selectPosts)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)

  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const [profileBg] = useState<string>(randomProfileBg())

  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId!

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
  }, [userId])

  useEffect(() => {
    const param = searchParams.get('edit')
    if (param !== null) {
      setSearchParams(param)
    }
  }, [searchParams])

  if (!userProfile) {
    return <div>Preloader</div>
  }

  let mappedContacts: ReactElement[] = []
  let isOwner: boolean = false

  if (userProfile) {
    mappedContacts = Object.entries(userProfile.contacts)
      .filter(c => c[1])
      .map(([contact, link]) => (
        <Contact
          key={contact}
          contact={contact as ContactValues}
          link={link!}
        />
      ))
    isOwner = userProfile.userId === authUserId
  }

  let postsElements = posts.map(p => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  return (
    <>
      <img src={profileBg} alt="profile background" className={s.profileBg} />
      <div className={s.profileWrapper}>
        <Flex justify="space-between" className={s.profileSection}>
          <Flex gap={10} align="center">
            <Avatar
              size={102}
              icon={<img src={userPhoto || userDefaultPhoto} alt="user" />}
            />
            <Flex vertical>
              <Typography.Title level={3} style={{ margin: 0, color: '#fff' }}>
                {userProfile.fullName}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: 0, color: '#fff' }}>
                {profileStatus}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          {isOwner && (
            <Link to="/edit-profile">
              <Button style={{ backgroundColor: '#ffaa00' }}>
                Edit profile
              </Button>
            </Link>
          )}
        </Flex>

        <Flex justify="space-around" wrap className={s.profileSection}>
          <div style={{ width: '50%' }}>
            {userProfile.aboutMe && (
              <div>
                <b>About me:</b> {userProfile.aboutMe}
              </div>
            )}
            {userProfile.lookingForAJob && <b>{`I am looking for a job`}</b>}
            {userProfile.lookingForAJobDescription && (
              <div>
                <b>Job description:</b> {userProfile.lookingForAJobDescription}
              </div>
            )}
          </div>
          {!!mappedContacts.length && (
            <div style={{ width: '50%' }}>
              <Typography.Title level={5}>Contacts</Typography.Title>
              {mappedContacts}
            </div>
          )}
        </Flex>

        <div className={s.postsBlock}>
          <h3>My posts</h3>
          <PostsForm />
          <div className={s.posts}>{postsElements}</div>
        </div>
      </div>
    </>
  )
})
