import { User } from '../../api/types'
import { getSidebarUsers } from './asyncActions'
import { sidebarReducer } from './reducer'
import { SidebarUsersArray } from './types'

test('sidebar users should be set', () => {
  const user: User = {
    name: 'Yan',
    id: 2,
    photos: {
      large: null,
      small: null
    },
    status: 'status',
    followed: false
  }
  const sidebarUsersArray = [user, user, user] as SidebarUsersArray

  const newState = sidebarReducer(
    { users: null },
    getSidebarUsers.fulfilled(sidebarUsersArray, 'requestId')
  )

  expect(newState.users?.length).toBe(3)
})
