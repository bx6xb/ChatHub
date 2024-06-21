import { Preloader } from "../../../components/Preloader/Preloader"
import userDefaultPhoto from "../../../assets/images/userDefaultPhoto.png"
import s from "./ProfileData.module.css"
import { useAppSelector } from "../../../store/store"
import { ReactElement } from "react"
import { Contact } from "./Contact/Contact"

export const ProfileData = (props: ProfileDataProps) => {
  const { userProfile, profileStatus } = useAppSelector((state) => state.profile)
  const authUserId = useAppSelector((state) => state.auth.id)

  let mappedContacts: ReactElement[] = []
  let isOwner: boolean = false

  if (userProfile) {
    mappedContacts = Object.entries(userProfile.contacts)
      .filter((c) => c[1])
      .map(([contact, link]) => <Contact key={contact} contact={contact} link={link} />)
    isOwner = userProfile.userId === authUserId
  }

  if (!userProfile) {
    return <Preloader />
  }

  return (
    <>
      <div className={s.descriptionBlock}>
        <img
          className={s.userPhoto}
          src={userProfile.photos.small || userDefaultPhoto}
          alt="user"
        />
        <div>{userProfile.fullName}</div>
        <div>{profileStatus}</div>
        {userProfile.aboutMe && (
          <div>
            <b>About me:</b> {userProfile.aboutMe}
          </div>
        )}
        <b>{`I am${userProfile.lookingForAJob ? "" : " not"} looking for a job`}</b>
        {userProfile.lookingForAJobDescription && (
          <div>
            <b>Job description:</b> {userProfile.lookingForAJobDescription}
          </div>
        )}
        {!!mappedContacts.length && (
          <div>
            <b>Contacts</b>
            <br />
            {mappedContacts}
          </div>
        )}
      </div>
      {isOwner && <button onClick={() => props.setProfileEditMode(true)}>Edit profile</button>}
    </>
  )
}

// types
type ProfileDataProps = {
  setProfileEditMode: (isProfileEditMode: boolean) => void
}
