import { useEffect } from "react"
import { Profile } from "./Profile"
import { AppRootStateType } from "../../redux/store"
import { getUserProfileTC } from "../../redux/profileReducer/profileReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// types
type ProfilePageParamsType = {
  id: string
}

export const ProfileContainer = () => {
  const userProfile = useSelector((state: AppRootStateType) => state.profilePage.userProfile)
  const dispatch = useDispatch()

  const urlParams = useParams<ProfilePageParamsType>()
  const userId = +(urlParams.id || 2)

  useEffect(() => {
    dispatch(getUserProfileTC(userId))
  }, [])

  return <Profile userProfile={userProfile} />
}
