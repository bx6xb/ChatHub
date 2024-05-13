import s from "./Message.module.css"

type MessageProps = {
  message: string
}

export const Message = (props: MessageProps) => {
  return <div className={s.dialog}>{props.message}</div>
}
