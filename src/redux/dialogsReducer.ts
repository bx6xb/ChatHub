import {
  ActionType,
  AddMessageActionType,
  DialogsPageType,
  UpdateNewMessageTextActionType,
} from "./state"

export const dialogsReducer = (state: DialogsPageType, action: ActionType): DialogsPageType => {
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
