import { useEffect } from "react"
import { Profile } from "./Profile"
import axios from "axios"
import { AppRootStateType } from "../../redux/store"
import { setUserProfileAC } from "../../redux/profileReducer/profileReducer"
import { useSelector } from "react-redux"

// types
export type UserProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string
    large: string
  }
} | null

// type ProfileContainerComponentPropsType = {
//   setUserProfileAC: (userProfile: UserProfileType) => void
//   userProfile: UserProfileType
// }

// const mapStateToProps = (state: AppRootStateType) => ({
//   userProfile: state.profilePage.userProfile,
// })

// export const ProfileContainer = connect(mapStateToProps, { setUserProfileAC })(
//   class ProfileContainer extends React.Component<ProfileContainerComponentPropsType> {
//     componentDidMount() {
//       axios
//         .get<UserProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
//         .then((resp) => {
//           this.props.setUserProfileAC(resp.data)
//         })
//     }
//     render() {
//       return <Profile {...this.props} />
//     }
//   }
// )

export const ProfileContainer = () => {
  const userProfile = useSelector((state: AppRootStateType) => state.profilePage.userProfile)

  useEffect(() => {
    axios
      .get<UserProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((resp) => {
        setUserProfileAC(resp.data)
      })
  }, [])

  return <Profile userProfile={userProfile} />
}
