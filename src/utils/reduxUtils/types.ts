import { ThunkDispatch } from 'redux-thunk'
import { AppRootState } from '../../store/store'
import { AnyAction } from 'redux'

export type DispatchType = ThunkDispatch<AppRootState, unknown, AnyAction>
