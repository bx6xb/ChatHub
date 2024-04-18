import { connect } from "react-redux"
import { UsersAPIComponent } from "./UsersAPIComponent"
import {
  changeCurrentPageAC,
  changeIsFetchingAC,
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
  isFetching: state.usersPage.isFetching,
})

// const mapDispatchToProps = (dispatch: DispatchType) => ({
//   follow(userId: number) {
//     dispatch(followAC(userId))
//   },
//   unfollow(userId: number) {
//     dispatch(unfollowAC(userId))
//   },
//   setUsers(users: UserType[]) {
//     dispatch(setUsersAC(users))
//   },
//   setCurrentPage(currentPage: number) {
//     dispatch(changeCurrentPageAC(currentPage))
//   },
//   setTotalUsers(totalUsers: number) {
//     dispatch(changeTotalUsersCountAC(totalUsers))
//   },
//   toggleIsFetching(isFetching: boolean) {
//     dispatch(changeIsFetchingAC(isFetching))
//   },
// })

export const UsersContainer = connect(mapStateToProps, {
  follow: followAC,
  unfollow: unfollowAC,
  setUsers: setUsersAC,
  setCurrentPage: changeCurrentPageAC,
  setTotalUsers: changeTotalUsersCountAC,
  toggleIsFetching: changeIsFetchingAC,
})(UsersAPIComponent)

// Functional component without using class component UsersAPIComponent.tsx

// import { useDispatch } from "react-redux"
// import {
//   UsersPageStateType,
//   changeCurrentPageAC,
//   changeTotalUsersCountAC,
//   followAC,
//   setUsersAC,
//   unfollowAC,
// } from "../../redux/usersReducer/usersReducer"
// import { useSelector } from "react-redux"
// import { AppRootStateType } from "../../redux/store"
// import { useEffect } from "react"
// import axios from "axios"
// import { Users } from "./Users"

// export const UsersContainer = () => {
//   const dispatch = useDispatch()
//   const state: UsersPageStateType = useSelector((state: AppRootStateType) => state.usersPage)

//   useEffect(() => {
//     if (state.users.length === 0) {
//       axios
//         .get(
//           `https://social-network.samuraijs.com/api/1.0/users?page=${state.currentPage}&count=${state.pageSize}`
//         )
//         .then((response) => {
//           dispatch(setUsersAC(response.data.items))
//           dispatch(changeTotalUsersCountAC(response.data.totalCount))

//           console.log(response)
//         })
//         .catch((err) => console.error(err))
//     }
//   }, [])

//   const onPageChange = (pageNumber: number) => {
//     dispatch(changeCurrentPageAC(pageNumber))

//     axios
//       .get(
//         `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${state.pageSize}`
//       )
//       .then((response) => dispatch(setUsersAC(response.data.items)))
//       .catch((err) => console.error(err))
//   }

//   const follow = (userId: number) => {
//     dispatch(followAC(userId))
//   }

//   const unfollow = (userId: number) => {
//     dispatch(unfollowAC(userId))
//   }

//   return (
//     <Users
//       currentPage={state.currentPage}
//       follow={follow}
//       unfollow={unfollow}
//       onPageChange={onPageChange}
//       pageSize={state.pageSize}
//       totalUsersCount={state.totalUsersCount}
//       users={state.users}
//     />
//   )
// }
