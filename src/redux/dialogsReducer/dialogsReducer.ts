// initial state
const initialState: DialogsPageState = {
  dialogs: [
    { id: 1, name: "Yan" },
    { id: 2, name: "Veronika" },
    { id: 3, name: "Sanya" },
    { id: 4, name: "Firdavs" },
    { id: 5, name: "Denis" },
    { id: 6, name: "Tolik" },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
    { id: 6, message: "Yo!" },
  ],
  newMessageText: "Zenow Turnt",
}

// reducer
export const dialogsReducer = (
  state: DialogsPageState = initialState,
  action: DialogsReducerAction
): DialogsPageState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            message: state.newMessageText,
          },
        ],
        newMessageText: "",
      }
    case "UPDATE_NEW_MESSAGE_TEXT":
      return {
        ...state,
        newMessageText: action.text,
      }
    default:
      return state
  }
}

// actions
export const addMessageAC = () =>
  ({
    type: "ADD_MESSAGE",
  } as const)
export const updateNewMessageAC = (text: string) =>
  ({
    type: "UPDATE_NEW_MESSAGE_TEXT",
    text,
  } as const)

// types
export type Message = {
  id: number
  message: string
}
export type Dialog = {
  id: number
  name: string
}
export type DialogsPageState = {
  dialogs: Dialog[]
  messages: Message[]
  newMessageText: string
}
export type DialogsReducerAction =
  | ReturnType<typeof addMessageAC>
  | ReturnType<typeof updateNewMessageAC>
