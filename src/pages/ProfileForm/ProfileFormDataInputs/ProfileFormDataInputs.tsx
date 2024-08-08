import { ControlledInputProps, ProfileFormData } from '../types'
import { Flex } from 'antd'
import { ControlledInput } from '../../../components/ControlledInput/ControlledInput'
import s from './ProfileFormDataInputs.module.scss'
import { Control } from 'react-hook-form'
import { ProfileDataValues, ProfileDomain } from '../../../api/types'
import { useTranslation } from 'react-i18next'

type ProfileFormDataInputsProps = {
  control: Control<ProfileFormData>
  userProfile: ProfileDomain
  profileStatus: string
}

export const ProfileFormDataInputs = ({
  control,
  userProfile,
  profileStatus
}: ProfileFormDataInputsProps) => {
  // localization
  const { t } = useTranslation()

  // variables
  const inputsData: ControlledInputProps[] = [
    {
      name: 'photo',
      as: 'upload',
      label: t('ProfileForm_set_profile_photo'),
      customRequest: () => {}, // to override and cancel upload
      maxCount: 1,
      showUploadList: false,
      className: '', // to override and not add styles to upload, and also to avoid duplicating the class name for other inputs
      uploadButtonText: t('ProfileForm_click_to_upload')
    },
    {
      name: 'fullName',
      label: t('ProfileForm_full_name'),
      defaultValue: userProfile.fullName
    },
    {
      name: 'profileStatus',
      label: t('ProfileForm_status'),
      defaultValue: profileStatus
    },
    {
      name: 'aboutMe',
      label: t('ProfileInfo_about_me'),
      defaultValue: userProfile.aboutMe?.toString(),
      rules: { required: true }
    },
    {
      name: 'lookingForAJob',
      as: 'checkbox',
      label: t('ProfileForm_looking_for_a_job'),
      defaultChecked: userProfile.lookingForAJob,
      type: 'checkbox'
    },
    {
      name: 'lookingForAJobDescription',
      label: t('ProfileForm_job_description'),
      defaultValue: userProfile.lookingForAJobDescription?.toString(),
      rules: { required: true }
    },
    ...(Object.entries(userProfile.contacts).map(([contact, link]) => ({
      name: `contacts.${contact}` as ProfileDataValues,
      label: contact[0].toUpperCase() + contact.slice(1),
      defaultValue: link && link.toString(),
      type: 'url'
    })) as ControlledInputProps[])
  ]

  // jsx variables
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

  return <>{mappedInputs}</>
}
