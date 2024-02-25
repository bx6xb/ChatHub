import { createRef } from "react"
import s from "./MyPosts.module.css"
import {Post} from "./Post/Post"
import { PostType } from "../../../redux/state"

type MyPostsPropsType = {
  posts: PostType[]
  addPost: (postMessage: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
  const newPostElement = createRef<HTMLTextAreaElement>()

  const onClickButtonHandler = () => {
    let text = newPostElement.current?.value
    if (text) {
      props.addPost(text)
    }
  }

  let postsElements = props.posts.map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} />
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
