import React, { ChangeEvent } from "react"
import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { addPostAC, updateNewPostAC } from "../../../redux/profileReducer/profileReducer"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { Field, InjectedFormProps, reduxForm } from "redux-form"

export const MyPosts = () => {
  const { newPostText, posts } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const addPost = () => {
    dispatch(addPostAC())
  }
  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    if (text.trim()) {
      dispatch(updateNewPostAC(text))
    }
  }
  const onSubmit = (formData: PostsFormData) => {
    dispatch(updateNewPostAC(formData.message))
    dispatch(addPostAC())
  }

  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      {/* <div>
        <div>
          <textarea value={newPostText} onChange={onPostChange} />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div> */}
      <PostsReduxForm onSubmit={onSubmit} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}

type PostsFormData = {
  message: string
}

const PostsForm: React.FC<InjectedFormProps<PostsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="message" component={"textarea"} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}
const PostsReduxForm = reduxForm<PostsFormData>({ form: "posts" })(PostsForm)
