import s from './Users.module.scss'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { ConfigProvider, List, Pagination } from 'antd'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { useEffect } from 'react'
import { getUsers } from '../../store/users/asyncActions'
import { changePageSize } from '../../store/users/reducer'
import { selectUsersState } from '../../store/users/selectors'
import { UsersSkeleton } from './UsersSkeleton/UsersSkeleton'
import { UserItem } from './UserItem/UserItem'
import { UsersTheme } from './UsersTheme'

const Users = withAuthRedirect(() => {
  // get data from the state
  const { pageSize, totalUsersCount, currentPage, isFetching, users } =
    useAppSelector(selectUsersState)

  // dispatch
  const dispatch = useAppDispatch()

  // get users on page size change
  useEffect(() => {
    dispatch(getUsers({ pageSize, currentPage }))
  }, [pageSize])

  // callbacks
  const onPageChange = (currentPage: number) => {
    dispatch(getUsers({ pageSize, currentPage }))
  }
  const onShowSizeChange = (currentPage: number, pageSize: number) => {
    dispatch(changePageSize(pageSize))
  }

  return (
    <ConfigProvider theme={UsersTheme}>
      <Pagination
        onChange={onPageChange}
        current={currentPage}
        total={totalUsersCount}
        pageSize={pageSize}
        showQuickJumper
        className={s.pagination}
        size="small"
        pageSizeOptions={[4, 6, 8, 10]}
        onShowSizeChange={onShowSizeChange}
      />
      {isFetching ? (
        <UsersSkeleton pageSize={pageSize} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={item => <UserItem item={item} />}
        />
      )}
    </ConfigProvider>
  )
})

export default Users
