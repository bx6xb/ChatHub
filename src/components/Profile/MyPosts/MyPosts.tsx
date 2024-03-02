import { createRef } from "react"
import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { ActionType, PostType, addPostAC, updateNewPostAC } from "../../../redux/state"

type MyPostsPropsType = {
  posts: PostType[]
  dispatch: (action: ActionType) => void
  newPostText: string
}

const MyPosts = (props: MyPostsPropsType) => {
  const newPostElement = createRef<HTMLTextAreaElement>()

  const onClickButtonHandler = () => {
    let text = newPostElement.current?.value
    if (text) {
      let action = addPostAC()
      props.dispatch(action)
    }
  }

  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  const onPostChange = () => {
    let text = newPostElement.current?.value
    if (text) {
      let action = updateNewPostAC(text)
      props.dispatch(action)
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange} />
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
