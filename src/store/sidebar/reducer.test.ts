import { User } from '../../api/types'
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
  } as User
  const sidebarUsersArray = [user, user, user] as SidebarUsersArray

  const newState = sidebarReducer(
    { users: null },
    getSidebarUsers.fulfilled(sidebarUsersArray, 'requestId')
  )

  expect(newState.users?.length).toBe(3)
})
