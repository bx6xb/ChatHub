import { User } from "../../api/api"

export type SidebarUsersArray = [User, User, User]
export type SidebarReducerState = {
  users: SidebarUsersArray | null
}
export type SidebarReducerAction = any
