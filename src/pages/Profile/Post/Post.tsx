import s from "./Post.module.css"
import avatar from "../../../assets/images/userDefaultPhoto.png"

export const Post = (props: PostProps) => {
  return (
    <div className={s.item}>
      <img src={avatar} alt="avatar" />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}

// types
type PostProps = {
  message: string
  likesCount: number
}
