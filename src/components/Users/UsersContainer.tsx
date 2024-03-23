import { connect } from "react-redux"
import { Users } from "./Users"
import { followAC, setUsersAC, unfollowAC, UserType } from "../../redux/usersReducer/usersReducer"
import { AppRootStateType, DispatchType } from "../../redux/store"

const mapStateToProps = (state: AppRootStateType) => ({
  users: state.usersPage.users,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  follow(userId: number) {
    dispatch(followAC(userId))
  },
  unfollow(userId: number) {
    dispatch(unfollowAC(userId))
  },
  setUsers(users: UserType[]) {
    dispatch(setUsersAC(users))
  },
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
