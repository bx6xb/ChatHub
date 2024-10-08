import { getSidebarUsers } from './asyncActions'
import { sidebarReducer } from './reducer'
import { SidebarUsersArray } from './types'

test('sidebar users should be set', () => {
  const user = {
    name: 'Yan',
    id: 2,
    photos: {
      large: null,
      small: null
    },
    status: 'status',
    followed: false
  }
  const sidebarUsersArray = [user, user, user]

  const newState = sidebarReducer(
    { users: null },
    getSidebarUsers.fulfilled(
      sidebarUsersArray as SidebarUsersArray,
      'requestId'
    )
  )

  expect(newState.users?.length).toBe(3)
})
