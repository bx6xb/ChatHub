import { SidebarType } from "./state"

const initialState: SidebarType = {
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

export const sidebarReducer = (state: SidebarType = initialState, action: any) => {
  return state
}
