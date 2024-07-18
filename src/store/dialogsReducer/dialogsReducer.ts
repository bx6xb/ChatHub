import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DialogsState } from './types'

const slice = createSlice({
  name: 'dialogs',
  initialState: {
    dialogs: [
      { id: 1, name: 'Yan' },
      { id: 2, name: 'Veronika' },
      { id: 3, name: 'Sanya' },
      { id: 4, name: 'Firdavs' },
      { id: 5, name: 'Denis' },
      { id: 6, name: 'Tolik' }
    ],
    messages: [
      { id: 1, message: 'Hi' },
      { id: 2, message: 'How is your it-kamasutra?' },
      { id: 3, message: 'Yo' },
      { id: 4, message: 'Yo' },
      { id: 5, message: 'Yo' },
      { id: 6, message: 'Yo!' }
    ]
  } as DialogsState,
  reducers: {
    addMessage(state, action: PayloadAction<{ message: string }>) {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            message: action.payload.message
          }
        ]
      }
    }
  }
})

// reducer
export const dialogsReducer = slice.reducer

// actions
export const { addMessage } = slice.actions
