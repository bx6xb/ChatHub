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
            message: action.message,
          },
        ],
      }
    default:
      return state
  }
}

// actions
export const addMessageAC = (message: string) =>
  ({
    type: "ADD_MESSAGE",
    message,
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
}
export type DialogsReducerAction = ReturnType<typeof addMessageAC>
