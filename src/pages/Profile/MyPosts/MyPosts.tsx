import { ChangeEvent } from "react"
import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { addPostAC, updateNewPostAC } from "../../../redux/profileReducer/profileReducer"
import { useAppDispatch, useAppSelector } from "../../../redux/store"

export const MyPosts = () => {
  const { newPostText, posts } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const addPost = () => {
    dispatch(addPostAC())
  }

  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    if (text.trim()) {
      dispatch(updateNewPostAC(text))
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea value={newPostText} onChange={onPostChange} />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}
