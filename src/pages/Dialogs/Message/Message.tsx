import s from './Message.module.css'

export const Message = (props: MessageProps) => {
  return <div className={s.dialog}>{props.message}</div>
}

// types
type MessageProps = {
  message: string
}
