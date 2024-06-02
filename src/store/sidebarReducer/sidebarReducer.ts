import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "sidebar",
  initialState: {
    friends: [
      {
        id: 1,
        name: "Yan",
      },
      {
        id: 2,
        name: "Veronika",
      },
      {
        id: 3,
        name: "Sasha",
      },
    ],
  } as SidebarReducerState,
  reducers: {},
})

export const sidebarReducer = slice.reducer

// types
export type Friends = {
  id: number
  name: string
}
type SidebarReducerState = {
  friends: Friends[]
}
export type SidebarReducerAction = any
