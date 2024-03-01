let renderEntireTree: (
  state: StateType,
  addPost: () => void,
  updateNewPostText: (text: string) => void
) => void

export type FriendsType = {
  id: number
  name: string
}

export type SidebarType = {
  friends: FriendsType[]
}

export type MessageType = {
  id: number
  message: string
}

export type DialogType = {
  id: number
  name: string
}

export type DialogsPageType = {
  dialogs: DialogType[]
  messages: MessageType[]
}

export type PostType = {
  id: number
  message: string
  likesCount: number
}

export type ProfilePageType = {
  posts: PostType[]
  newPostText: string
}

export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}

export const state: StateType = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    newPostText: "Yan Turnt",
  },
  dialogsPage: {
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
  },
  sidebar: {
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
  },
}

export let addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0,
  }
  state.profilePage.posts.unshift(newPost)
  renderEntireTree(state, addPost, updateNewPostText)
  state.profilePage.newPostText = ""
}

export const updateNewPostText = (text: string) => {
  state.profilePage.newPostText = text
  renderEntireTree(state, addPost, updateNewPostText)
}

export const subscribe = (observer: any) => {
  renderEntireTree = observer
}
