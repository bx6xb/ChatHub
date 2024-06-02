import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { useAppSelector } from "../../../store/store"
import { PostsForm } from "./PostsForm"

export const MyPosts = () => {
  const { posts } = useAppSelector((state) => state.profile)

  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <PostsForm />
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}
