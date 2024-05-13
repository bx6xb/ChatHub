const initialState: SidebarReducerState = {
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
}

export const sidebarReducer = (state = initialState, action: SidebarReducerAction) => {
  return state
}

// types
export type Friends = {
  id: number
  name: string
}
type SidebarReducerState = {
  friends: Friends[]
}
export type SidebarReducerAction = any
