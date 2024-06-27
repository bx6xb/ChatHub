import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProfileStatus, getUserProfile } from "../../store/profileReducer/profileReducer"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { ProfileForm } from "./ProfileForm/ProfileForm"
import { ProfileData } from "./ProfileData/ProfileData"
import { Post } from "./Post/Post"
import { PostsForm } from "./PostsForm"
import s from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import { profileSelectors } from "../../store/profileReducer"

export const Profile = withAuthRedirect(() => {
  const [isProfileEditMode, setProfileEditMode] = useState(false)

  const authorizedUserId = useAppSelector(authSelectors.selectId)
  const posts = useAppSelector(profileSelectors.selectPosts)
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
      <img
        src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350"
        alt="profile background"
      />
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
