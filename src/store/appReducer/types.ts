export type AppState = {
  isAppInitialized: boolean
  appMessages: AppMessage[]
}
export type AppMessage = {
  id: string
  message: string
  isError: boolean
}
