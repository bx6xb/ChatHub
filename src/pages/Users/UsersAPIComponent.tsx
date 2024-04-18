import axios from "axios"
import { UserType } from "../../redux/usersReducer/usersReducer"
import React from "react"
import { Users } from "./Users"
import { Preloader } from "../../components/Preloader/Preloader"
import { usersAPI } from "../../api/api"

type UsersAPIComponentPropsType = {
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: UserType[]) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  setTotalUsers: (totalUsers: number) => void
  isFetching: boolean
  toggleIsFetching: (isFetching: boolean) => void
}

export class UsersAPIComponent extends React.Component<UsersAPIComponentPropsType> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.toggleIsFetching(true)

      usersAPI
        .getUsers(this.props.pageSize, this.props.pageSize)
        .then((response) => {
          this.props.setUsers(response.data.items)
          this.props.setTotalUsers(response.data.totalCount)
          this.props.toggleIsFetching(false)
        })
        .catch((err) => console.error(err))
    }
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)

    usersAPI
      .getUsers(this.props.pageSize, pageNumber)
      .then((response) => {
        this.props.setUsers(response.data.items)
        this.props.toggleIsFetching(false)
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            follow={this.props.follow}
            onPageChange={this.onPageChange}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            unfollow={this.props.unfollow}
          />
        )}
      </>
    )
  }
}
