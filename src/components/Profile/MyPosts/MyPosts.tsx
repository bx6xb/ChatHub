import { ChangeEvent } from "react"
import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { PostType } from "../../../redux/profileReducer/profileReducer"

type MyPostsPropsType = {
  posts: PostType[]
  newPostText: string
  addPost: () => void
  updateNewPostText: (text: string) => void
}

export const MyPosts = (props: MyPostsPropsType) => {
  const onClickButtonHandler = () => {
    props.addPost()
  }

  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    if (text.trim()) {
      props.updateNewPostText(text)
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
