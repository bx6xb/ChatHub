import s from "./Post.module.css"
import avatar from "../../../../assets/images/userDefaultPhoto.png"

type PostProps = {
  message: string
  likesCount: number
}

export const Post = (props: PostProps) => {
  return (
    <div className={s.item}>
      <img src={avatar} />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}
