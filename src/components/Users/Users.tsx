import axios from "axios"
import { UserType } from "../../redux/usersReducer/usersReducer"
import s from "./Users.module.css"
import userPhoto from "../../assets/images/userDefaultPhoto.png"
import React from "react"

type UsersPropsType = {
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: UserType[]) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  setTotalUsers: (totalUsers: number) => void
}

export class Users extends React.Component<UsersPropsType> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
        .then((response) => {
          this.props.setUsers(response.data.items)
          this.props.setTotalUsers(response.data.totalCount)

          console.log(response)
        })
        .catch((err) => console.error(err))
    }
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => this.props.setUsers(response.data.items))
      .catch((err) => console.error(err))
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(
        <span
          onClick={() => this.onPageChange(i)}
          key={i}
          className={this.props.currentPage === i ? s.selectedPage : ""}
        >
          {i}
        </span>
      )
    }

    return (
      <div>
        <div>{pages}</div>
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
              </div>
              <div>
                {u.followed ? (
                  <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
                ) : (
                  <button onClick={() => this.props.follow(u.id)}>follow</button>
                )}
              </div>
            </span>

            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                {/* <div>{u.location.city}</div> */}
                {/* <div>{u.location.country}</div> */}
              </span>
            </span>
          </div>
        ))}
      </div>
    )
  }
}

// export const Users = (props: UsersPropsType) => {
//   const getUsers = () => {
//     if (props.users.length === 0) {
//       axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response) => {
//         console.log(response)
//         props.setUsers(response.data.items)
//       })
//     }
//   }

//   return (
//     <div>
//       <button onClick={getUsers}>get users</button>
//       {props.users.map((u) => (
//         <div key={u.id}>
//           <span>
//             <div>
//               <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
//             </div>

//             <div>
//               {u.followed ? (
//                 <button onClick={() => props.unfollow(u.id)}>unfollow</button>
//               ) : (
//                 <button onClick={() => props.follow(u.id)}>follow</button>
//               )}
//             </div>
//           </span>

//           <span>
//             <span>
//               <div>{u.name}</div>
//               <div>{u.status}</div>
//             </span>
//             <span>
//               {/* <div>{u.location.city}</div> */}
//               {/* <div>{u.location.country}</div> */}
//             </span>
//           </span>
//         </div>
//       ))}
//     </div>
//   )
// }
