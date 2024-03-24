import { connect } from "react-redux"
import { Users } from "./Users"
import {
  changeCurrentPageAC,
  changeTotalUsersCountAC,
  followAC,
  setUsersAC,
  unfollowAC,
  UserType,
} from "../../redux/usersReducer/usersReducer"
import { AppRootStateType, DispatchType } from "../../redux/store"

const mapStateToProps = (state: AppRootStateType) => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
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
  setCurrentPage(currentPage: number) {
    dispatch(changeCurrentPageAC(currentPage))
  },
  setTotalUsers(totalUsers: number) {
    dispatch(changeTotalUsersCountAC(totalUsers))
  },
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
