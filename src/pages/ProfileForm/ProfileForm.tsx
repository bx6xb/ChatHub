import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
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
import {
  ControlledInput,
  ControlledInputProps as ControlledInputPropsWithoutGeneric
} from '../../components/ControlledInput/ControlledInput'
import s from './ProfileForm.module.scss'
import { Avatar, Button, Flex } from 'antd'
import { setAppMessage, setIsError } from '../../store/appReducer/appReducer'
import { setAuthorizedUserPhoto } from '../../store/authReducer/authReducer'
import { useEffect, useState } from 'react'

type ControlledInputProps = ControlledInputPropsWithoutGeneric<FormValues>

export type FormValues = ProfileData & {
  profileStatus: string
  photo: {
    file: {
      uid: string
      lastModified: number
      lastModifiedDate: string
      name: string
      size: number
      type: string
      percent: number
      originFileObj: File
      status: string
    }
  }
}

export const ProfileForm = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(profileSelectors.selectUserProfile)
  const profileStatus = useAppSelector(profileSelectors.selectProfileStatus)

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [photoPreview, setPhotoPreview] = useState<string>()

  // form init
  const { handleSubmit, control } = useForm<FormValues>()

  // watch photo
  const photoFromForm = useWatch({ control, name: 'photo.file.originFileObj' })

  useEffect(() => {
    if (photoFromForm) {
      const photoUrl = URL.createObjectURL(photoFromForm)
      setPhotoPreview(photoUrl)
    }
  }, [photoFromForm])

  if (!userProfile) {
    return <Loading />
  }

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { photo, profileStatus, ...profileData } = data

    // getting payload data to find errors when publishing data
    const result1 = (await dispatch(setProfileData(profileData))).payload
    const result2 = (await dispatch(setProfileStatus(profileStatus))).payload
    let result3: Photos | null | undefined

    if (photo) {
      result3 = (await dispatch(setProfilePhoto(photo.file.originFileObj)))
        .payload
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

  // variables
  const inputsData: ControlledInputProps[] = [
    {
      name: 'photo',
      as: 'upload',
      label: 'Set profile photo',
      customRequest: () => {}, // to override and cancel upload
      maxCount: 1,
      showUploadList: false,
      className: '' // to override and not add styles to upload, and also to avoid duplicating the class name for other inputs
    },
    {
      name: 'fullName',
      label: 'Full name',
      defaultValue: userProfile.fullName
    },
    {
      name: 'profileStatus',
      label: 'Status',
      defaultValue: profileStatus
    },
    {
      name: 'aboutMe',
      label: 'About me',
      defaultValue: userProfile.aboutMe?.toString(),
      rules: { required: true }
    },
    {
      name: 'lookingForAJob',
      as: 'checkbox',
      label: 'Looking for a job',
      defaultChecked: userProfile.lookingForAJob,
      type: 'checkbox'
    },
    {
      name: 'lookingForAJobDescription',
      label: 'Job description',
      defaultValue: userProfile.lookingForAJobDescription?.toString(),
      rules: { required: true }
    },
    ...(Object.entries(userProfile.contacts).map(([contact, link]) => ({
      name: `contacts.${contact}` as ProfileDataValues,
      label: contact[0].toUpperCase() + contact.slice(1),
      defaultValue: link && link.toString(),
      placeholder: 'Link',
      type: 'url'
    })) as ControlledInputProps[])
  ]

  const mappedInputs = inputsData.map((input, i) => {
    const componentProps: ControlledInputProps = {
      className: s.input,
      control: control,
      ...input
    }

    return (
      <Flex
        justify="space-between"
        align="center"
        key={i}
        className={s.inputWrapper}
      >
        <ControlledInput {...componentProps} />
      </Flex>
    )
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Flex gap={6} vertical>
        {/* Photo preview */}
        {photoPreview && (
          <Flex justify="start">
            <Avatar size={64} icon={<img src={photoPreview} />} />
          </Flex>
        )}

        {/* inputs */}
        {mappedInputs}
      </Flex>

      {/* submit button */}
      <Button htmlType="submit" className="submitFormButton">
        Submit
      </Button>
    </form>
  )
})
