import { connect } from "react-redux"
import { addPostAC, updateNewPostAC } from "../../../redux/profileReducer/profileReducer"
import { MyPosts } from "./MyPosts"
import { AppRootStateType, DispatchType } from "../../../redux/store"

const mapStateToProps = (state: AppRootStateType) => ({
  posts: state.profilePage.posts,
  newPostText: state.profilePage.newPostText,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  updateNewPostText(text: string) {
    let action = updateNewPostAC(text)
    dispatch(action)
  },
  addPost() {
    dispatch(addPostAC())
  },
})

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
