import {
  setProfileData,
  setProfilePhoto,
  setProfileStatus
} from '../../store/profile/asyncActions'
import { Photos } from '../../api/types'
import { setAuthorizedUserPhoto } from '../../store/auth/reducer'
import { addAppMessage } from '../../store/app/reducer'
import { v4 } from 'uuid'
import { ProfileFormData } from '../../pages/ProfileForm/types'
import { t } from 'i18next'
import { DispatchType } from '../reduxUtils/types'

export const handleFormSubmit = async (
  dispatch: DispatchType,
  data: ProfileFormData
) => {
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
    dispatch(
      addAppMessage({
        id: v4(),
        message: t('ProfileForm_data_updated'),
        isError: false
      })
    )
  }
}
