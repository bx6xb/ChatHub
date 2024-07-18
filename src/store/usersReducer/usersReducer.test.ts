import { follow, getUsers, unfollow } from './asyncActions'
import { UsersPageState } from './types'
import {
  changeIsFetching,
  changeIsFollowingInProgress,
  usersReducer,
  changePageSize
} from './usersReducer'

export const initialState: UsersPageState = {
  users: [
    {
      name: 'anastasiyaArkhipchuk',
      id: 30993,
      photos: {
        small: null,
        large: null
      },
      status: null,
      followed: false
    },
    {
      name: 'F-A-Z-A',
      id: 30992,
      photos: {
        small: null,
        large: null
      },
      status: null,
      followed: true
    }
  ],
  pageSize: 6,
  totalUsersCount: 28,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: []
}

// tests
test('user should be followed', () => {
  const userId = 30993
  const newState = usersReducer(
    initialState,
    follow.fulfilled(userId, 'requestId', userId)
  )

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[0].followed).toBeTruthy()
})
test('user should be unfollowed', () => {
  const userId = 30992
  const newState = usersReducer(
    initialState,
    unfollow.fulfilled(userId, 'requestId', userId)
  )

  expect(newState).not.toBe(initialState)
  expect(newState.users).not.toBe(initialState.users)
  expect(newState.users[1].followed).toBeFalsy()
})
test('users should be added', () => {
  const thunkReturnValue = {
    users: initialState.users,
    currentPage: 66,
    totalCount: 582
  }
  const newState = usersReducer(
    initialState,
    getUsers.fulfilled(thunkReturnValue, 'requestId', {
      currentPage: thunkReturnValue.currentPage,
      pageSize: 10
    })
  )

  expect(newState).not.toBe(initialState)
  expect(newState.users.length).toBe(2)
  expect(newState.currentPage).toBe(thunkReturnValue.currentPage)
  expect(newState.totalUsersCount).toBe(thunkReturnValue.totalCount)
})
test('page size should be changed', () => {
  const pageSize = 10
  const newState = usersReducer(initialState, changePageSize({ pageSize }))

  expect(newState).not.toBe(initialState)
  expect(newState.users).toBe(initialState.users)
  expect(newState.pageSize).toBe(pageSize)
})
test('property isFetching should be changed', () => {
  const newState = usersReducer(
    initialState,
    changeIsFetching({ isFetching: true })
  )

  expect(newState).not.toBe(initialState)
  expect(newState.isFetching).toBeTruthy()
})
test('property isFollowingInProgress should be changed', () => {
  const userId = 66
  const newState = usersReducer(
    initialState,
    changeIsFollowingInProgress({ isFetching: true, userId })
  )

  expect(newState).not.toBe(initialState)
  expect(newState.isFollowingInProgress[0]).toBe(userId)
})
