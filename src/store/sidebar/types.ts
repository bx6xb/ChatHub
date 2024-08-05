import { User } from '../../api/types'

export type SidebarUsersArray = [User, User, User]
export type SidebarReducerState = {
  users: SidebarUsersArray | null
}
export type SidebarReducerAction = any
