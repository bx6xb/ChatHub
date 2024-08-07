import { TypedUseSelectorHook } from 'react-redux'
import { AppRootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DispatchType } from './types'

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch: () => DispatchType = () => useDispatch()
