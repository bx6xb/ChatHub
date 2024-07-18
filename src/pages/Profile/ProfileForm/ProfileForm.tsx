import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileData, ProfileDataValues } from '../../../api/api'
import { useAppDispatch, useAppSelector } from '../../../utils/redexUtils'
import { profileSelectors } from '../../../store/profileReducer'
import {
  setProfileData,
  setProfilePhoto,
  setProfileStatus
} from '../../../store/profileReducer/asyncActions'

export const ProfileForm = () => {
  const { register, handleSubmit } = useForm<Inputs>()

  const { userProfile, profileStatus } = useAppSelector(
    profileSelectors.selectProfileState
  )
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = data => {
    const { photo, profileStatus, ...profileData } = data
    dispatch(setProfileData(profileData))
    dispatch(setProfileStatus(profileStatus))
    if (photo.length) {
      dispatch(setProfilePhoto(photo[0]))
    }
  }

  if (!userProfile) {
    return <div>Preloader</div>
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <label>
          Set photo <input type="file" {...register('photo')} />
        </label>
        <br />
        <label>
          Full name{' '}
          <input
            defaultValue={userProfile.fullName}
            {...register('fullName')}
          />
        </label>
        <br />
        <label>
          Status{' '}
          <input defaultValue={profileStatus} {...register('profileStatus')} />
        </label>
        <br />
        <label>
          About me{' '}
          <input
            defaultValue={userProfile.aboutMe?.toString()}
            {...register('aboutMe', { required: true })}
          />
        </label>
        <br />
        <label>
          Looking for a job{' '}
          <input
            type="checkbox"
            defaultChecked={userProfile.lookingForAJob}
            {...register('lookingForAJob')}
          />
        </label>
        <div>
          Job description{' '}
          <input
            defaultValue={userProfile.lookingForAJobDescription?.toString()}
            {...register('lookingForAJobDescription', { required: true })}
          />
        </div>
        {Object.entries(userProfile.contacts).map(([contact, link]) => {
          return (
            <React.Fragment key={contact}>
              <label>
                {contact}{' '}
                <input
                  defaultValue={link?.toString()}
                  placeholder="link"
                  {...register(`contacts.${contact}` as ProfileDataValues)}
                />
              </label>
              <br />
            </React.Fragment>
          )
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

// types
type Inputs = ProfileData & {
  profileStatus: string
  photo: File[]
}
