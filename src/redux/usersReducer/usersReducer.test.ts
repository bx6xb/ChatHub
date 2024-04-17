import {
  UsersPageType,
  changeCurrentPageAC,
  changeIsFetchingAC,
  changePageSizeAC,
  changeTotalUsersCountAC,
  followAC,
  setUsersAC,
  unfollowAC,
  usersReducer,
} from "./usersReducer"

export const initialState: UsersPageType = {
  users: [
    {
      name: "anastasiyaArkhipchuk",
      id: 30993,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: "F-A-Z-A",
      id: 30992,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true,
    },
  ],
  pageSize: 6,
  totalUsersCount: 28,
  currentPage: 1,
  isFetching: false,
}

test("user should be followed", () => {
  const userId = 30993
  const newState = usersReducer(initialState, followAC(userId))

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[0].followed).toBeTruthy()
})

test("user should be unfollowed", () => {
  const userId = 30992
  const newState = usersReducer(initialState, unfollowAC(userId))

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[1].followed).toBeFalsy()
})

test("users should be added", () => {
  const newState = usersReducer(initialState, setUsersAC(initialState.users))

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users.length).toBe(2)
})

test("page size should be changed", () => {
  const pageSize = 10
  const newState = usersReducer(initialState, changePageSizeAC(pageSize))

  expect(newState).not.toBe(initialState)
  expect(newState.users).toBe(initialState.users)
  expect(newState.pageSize).toBe(pageSize)
})

test("total users count should be changed", () => {
  const totalUsersCount = 35
  const newState = usersReducer(initialState, changeTotalUsersCountAC(totalUsersCount))

  expect(newState).not.toBe(initialState)
  expect(newState.users).toBe(initialState.users)
  expect(newState.totalUsersCount).toBe(totalUsersCount)
})

test("current page should be changed", () => {
  const currentPage = 3
  const newState = usersReducer(initialState, changeCurrentPageAC(currentPage))

  expect(newState).not.toBe(initialState)
  expect(newState.users).toBe(initialState.users)
  expect(newState.currentPage).toBe(currentPage)
})

test("property isFetching should be changed", () => {
  const newState = usersReducer(initialState, changeIsFetchingAC(true))

  expect(newState).not.toBe(initialState)
  expect(newState.isFetching).toBeTruthy()
})
