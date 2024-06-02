import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getUserStatus, getUserProfile } from "../../store/profileReducer/profileReducer"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { MyPosts } from "./MyPosts/MyPosts"

export const Profile = withAuthRedirect(() => {
  const authorizedUserId = useAppSelector((state) => state.auth.id)
  const dispatch = useAppDispatch()

  const urlParams = useParams<{
    id: string
  }>()
  const userId = urlParams.id ? +urlParams.id : authorizedUserId!

  useEffect(() => {
    dispatch(getUserProfile(userId))
    dispatch(getUserStatus(userId))
  }, [])

  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  )
})
