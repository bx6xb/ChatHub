import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { ProfileForm } from "./ProfileForm/ProfileForm"
import { ProfileData } from "./ProfileData/ProfileData"
import { Post } from "./Post/Post"
import { PostsForm } from "./PostsForm"
import s from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import { profileSelectors } from "../../store/profileReducer"
import { getProfileStatus, getUserProfile } from "../../store/profileReducer/asyncActions"
import { randomProfileBg } from "../../utils/randomProfileBg"
import userDefaultPhoto from "../../assets/images/userDefaultPhoto.png"

export const Profile = withAuthRedirect(() => {
  console.log("Profile")
  const [isProfileEditMode, setProfileEditMode] = useState(false)
  const [profileBg] = useState<string>(randomProfileBg())

  const authorizedUserId = useAppSelector(authSelectors.selectId)
  const posts = useAppSelector(profileSelectors.selectPosts)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)
  const dispatch = useAppDispatch()

  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId!

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
  }, [userId])

  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  return (
    <>
      <img src={profileBg} alt="profile background" className={s.profileBg} />
      <img className={s.userPhoto} src={userPhoto || userDefaultPhoto} alt="user" />
      {isProfileEditMode ? (
        <ProfileForm setProfileEditMode={setProfileEditMode} />
      ) : (
        <>
          <ProfileData setProfileEditMode={setProfileEditMode} />
          {/* Posts */}
          <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostsForm />
            <div className={s.posts}>{postsElements}</div>
          </div>
        </>
      )}
    </>
  )
})
