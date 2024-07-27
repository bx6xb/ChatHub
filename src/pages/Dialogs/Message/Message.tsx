export const Message = (props: MessageProps) => {
  return <div>{props.message}</div>
}

// types
type MessageProps = {
  message: string
}
