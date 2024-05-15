import { DialogsPageState, addMessageAC, dialogsReducer } from "./dialogsReducer"

let state: DialogsPageState

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
  }
})

test("new message should be added in stateTypes", () => {
  const message = "new message"
  const newState = dialogsReducer(state, addMessageAC(message))

  expect(newState).not.toBe(state)
  expect(newState).not.toEqual(state)
  expect(newState.messages.length).toBe(7)
  expect(newState.dialogs.length).toBe(6)
  expect(newState.messages.pop()!.message).toBe(message)
})
