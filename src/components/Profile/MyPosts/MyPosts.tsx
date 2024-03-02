import { ChangeEvent, createRef } from "react"
import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { ActionType, PostType } from "../../../redux/state"
import { addPostAC, updateNewPostAC } from "../../../redux/profileReducer"

type MyPostsPropsType = {
  posts: PostType[]
  dispatch: (action: ActionType) => void
  newPostText: string
}

const MyPosts = (props: MyPostsPropsType) => {
  const onClickButtonHandler = () => {
    let action = addPostAC()
    props.dispatch(action)
  }

  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    if (text.trim()) {
      let action = updateNewPostAC(text.trim())
      props.dispatch(action)
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea value={props.newPostText} onChange={onPostChange} />
        </div>
        <div>
          <button onClick={onClickButtonHandler}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
