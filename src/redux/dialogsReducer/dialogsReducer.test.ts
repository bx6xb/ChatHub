import { DialogsPageType, addMessageAC, dialogsReducer, updateNewMessageAC } from "./dialogsReducer"

let state: DialogsPageType

beforeEach(() => {
  state = {
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
})

test("new message should be added in stateTypes", () => {
  const action = addMessageAC()
  const newState = dialogsReducer(state, action)

  expect(newState).not.toBe(state)
  expect(newState).not.toEqual(state)
  expect(newState.messages.length).toBe(7)
  expect(newState.dialogs.length).toBe(6)
  expect(newState.newMessageText).toBe("")
})

test("new message text should be updated", () => {
  let message = "new message"

  const action = updateNewMessageAC(message)
  const newState = dialogsReducer(state, action)

  expect(newState).not.toBe(state)
  expect(newState).not.toEqual(state)
  expect(newState.messages.length).toBe(6)
  expect(newState.dialogs.length).toBe(6)
  expect(newState.newMessageText).toBe(message)
})
