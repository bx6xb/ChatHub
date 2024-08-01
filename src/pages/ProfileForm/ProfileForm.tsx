import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import { profileSelectors } from '../../store/profileReducer'
import {
  setProfileData,
  setProfilePhoto,
  setProfileStatus
} from '../../store/profileReducer/asyncActions'
import { Photos, ProfileData, ProfileDataValues } from '../../api/api'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Loading } from '../../components/Loading/Loading'
import { ControlledInput } from '../../components/ControlledInput/ControlledInput'
import s from './ProfileForm.module.scss'
import { Button, Flex } from 'antd'
import { setAppMessage, setIsError } from '../../store/appReducer/appReducer'
import { setAuthorizedUserPhoto } from '../../store/authReducer/authReducer'

type Inputs = ProfileData & {
  profileStatus: string
  photo: File[]
}

export const ProfileForm = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(profileSelectors.selectUserProfile)
  const profileStatus = useAppSelector(profileSelectors.selectProfileStatus)

  // dispatch
  const dispatch = useAppDispatch()

  // form init
  const { register, handleSubmit, control } = useForm<Inputs>()

  if (!userProfile) {
    return <Loading />
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { photo, profileStatus, ...profileData } = data

    // getting payload data to find errors when publishing data
    const result1 = (await dispatch(setProfileData(profileData))).payload
    const result2 = (await dispatch(setProfileStatus(profileStatus))).payload
    let result3: Photos | null | undefined

    if (photo.length) {
      result3 = (await dispatch(setProfilePhoto(photo[0]))).payload
    }

    // set new authorized user photo
    if (result3) {
      dispatch(setAuthorizedUserPhoto(result3.large))
    }

    // if any of the results are null, it is an error
    const isError = [result1, result2, result3].includes(null)

    // if there are no errors, display publication information
    if (!isError) {
      dispatch(setAppMessage('Data updated successfully'))
      dispatch(setIsError(false))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Flex gap={3} vertical>
        <label>
          Set photo <input type="file" {...register('photo')} />
        </label>

        <Flex justify="space-between" align="center">
          <ControlledInput
            defaultValue={userProfile.fullName}
            name="fullName"
            control={control}
            className={s.input}
            label="Full name"
          />
        </Flex>
        <Flex justify="space-between" align="center">
          <ControlledInput
            defaultValue={profileStatus}
            name="profileStatus"
            control={control}
            className={s.input}
            label="Status"
          />
        </Flex>
        <Flex justify="space-between" align="center">
          <ControlledInput
            defaultValue={userProfile.aboutMe?.toString()}
            name="aboutMe"
            control={control}
            className={s.input}
            label="About me"
            rules={{ required: true }}
          />
        </Flex>
        <Flex justify="space-between" align="center">
          <ControlledInput
            defaultChecked={userProfile.lookingForAJob}
            name="lookingForAJob"
            control={control}
            label="Looking for a job"
            as="checkbox"
            type="checkbox"
          />
        </Flex>
        <Flex justify="space-between" align="center">
          <ControlledInput
            defaultValue={userProfile.lookingForAJobDescription?.toString()}
            name="lookingForAJobDescription"
            control={control}
            rules={{ required: true }}
            label="Job description"
            className={s.input}
          />
        </Flex>

        {/* Contacts */}
        {Object.entries(userProfile.contacts).map(([contact, link]) => {
          const label = contact[0].toUpperCase() + contact.slice(1)

          return (
            <Flex justify="space-between" align="center" key={contact}>
              <ControlledInput
                defaultValue={link?.toString()}
                name={`contacts.${contact}` as ProfileDataValues}
                control={control}
                label={label}
                placeholder="link"
                className={s.input}
              />
            </Flex>
          )
        })}
      </Flex>

      <Button htmlType="submit" className="submitFormButton">
        Submit
      </Button>
    </form>
  )
})
