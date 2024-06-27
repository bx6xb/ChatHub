export type Message = {
  id: number
  message: string
}
export type Dialog = {
  id: number
  name: string
}
export type DialogsState = {
  dialogs: Dialog[]
  messages: Message[]
}
