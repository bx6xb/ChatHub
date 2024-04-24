import { useEffect } from "react"
import { Profile } from "./Profile"
import { AppRootStateType } from "../../redux/store"
import { getUserProfileTC } from "../../redux/profileReducer/profileReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { UserProfileType } from "../../api/api"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"

type ProfilePageParamsType = {
  id: string
}

export const ProfileContainer = withAuthRedirect(() => {
  const userProfile = useSelector<AppRootStateType, UserProfileType>(
    (state) => state.profilePage.userProfile
  )
  const dispatch = useDispatch()

  const urlParams = useParams<ProfilePageParamsType>()
  const userId = +(urlParams.id || 2)

  useEffect(() => {
    dispatch(getUserProfileTC(userId))
  }, [])

  return <Profile userProfile={userProfile} />
})
