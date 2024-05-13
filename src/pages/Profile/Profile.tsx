import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getUserStatusTC, getUserProfileTC } from "../../redux/profileReducer/profileReducer"
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
    dispatch(getUserProfileTC(userId))
    setTimeout(() => {
      dispatch(getUserStatusTC(userId))
    }, 1500)
  }, [])

  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  )
})
