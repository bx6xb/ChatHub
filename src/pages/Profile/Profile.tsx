import { useAppDispatch, useAppSelector } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProfileStatus, getUserProfile } from "../../store/profileReducer/profileReducer"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { MyPosts } from "./MyPosts/MyPosts"
import { ProfileForm } from "./ProfileForm/ProfileForm"
import { ProfileData } from "./ProfileData/ProfileData"

export const Profile = withAuthRedirect(() => {
  const [isProfileEditMode, setProfileEditMode] = useState(false)

  const authorizedUserId = useAppSelector((state) => state.auth.id)
  const dispatch = useAppDispatch()

  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId!

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getProfileStatus(userId))
  }, [])

  return (
    <div>
      <div>
        <img
          src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="profile background"
        />
      </div>
      {isProfileEditMode ? (
        <ProfileForm setProfileEditMode={setProfileEditMode} />
      ) : (
        <>
          <ProfileData setProfileEditMode={setProfileEditMode} />
          <MyPosts />
        </>
      )}
    </div>
  )
})
