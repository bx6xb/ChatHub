import {
  ActionType,
  AddMessageActionType,
  DialogsPageType,
  UpdateNewMessageTextActionType,
} from "./state"

const initialState: DialogsPageType = {
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

export const dialogsReducer = (
  state: DialogsPageType = initialState,
  action: ActionType
): DialogsPageType => {
  switch (action.type) {
    case "ADD-MESSAGE":
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
    case "UPDATE-NEW-MESSAGE-TEXT":
      return {
        ...state,
        newMessageText: action.text,
      }
    default:
      return state
  }
}

export const addMessageAC = (): AddMessageActionType => ({
  type: "ADD-MESSAGE",
})

export const updateNewMessageAC = (text: string): UpdateNewMessageTextActionType => ({
  type: "UPDATE-NEW-MESSAGE-TEXT",
  text,
})
