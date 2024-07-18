import userPhoto from '../../assets/images/userDefaultPhoto.png'
import s from './Users.module.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Avatar, Button, Flex, List, Pagination, Skeleton } from 'antd'
import { useAppDispatch, useAppSelector } from '../../utils/redexUtils'
import { usersSelectors } from '../../store/usersReducer'
import { useEffect } from 'react'
import {
  follow,
  getUsers,
  unfollow
} from '../../store/usersReducer/asyncActions'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { changePageSize } from '../../store/usersReducer/usersReducer'

const Users = withAuthRedirect(() => {
  const {
    pageSize,
    totalUsersCount,
    currentPage,
    isFollowingInProgress,
    isFetching,
    users
  } = useAppSelector(usersSelectors.selectUsersState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers({ pageSize, currentPage }))
  }, [pageSize])

  const onPageChange = (currentPage: number) => {
    dispatch(getUsers({ pageSize, currentPage }))
  }
  const followOnClick = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowOnClick = (userId: number) => {
    dispatch(unfollow(userId))
  }
  const onShowSizeChange = (currentPage: number, pageSize: number) => {
    dispatch(changePageSize({ pageSize }))
  }

  return (
    <>
      <Pagination
        onChange={onPageChange}
        current={currentPage}
        total={totalUsersCount}
        pageSize={pageSize}
        showQuickJumper
        style={{ marginBottom: '20px' }}
        size="small"
        pageSizeOptions={[4, 6, 8, 10]}
        onShowSizeChange={onShowSizeChange}
      />
      {isFetching ? (
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={() => (
            <List.Item style={{ width: '400px' }}>
              <Flex
                align="start"
                justify="space-between"
                style={{ width: '100%' }}
              >
                <Flex gap={10}>
                  <Skeleton.Avatar active size={70} shape="circle" />
                  <Skeleton.Input active />
                </Flex>
                <Skeleton.Button size="large" active />
              </Flex>
            </List.Item>
          )}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={item => {
            const isDisabled = isFollowingInProgress.some(id => id === item.id)

            return (
              <List.Item style={{ width: '400px' }}>
                <Flex
                  align="start"
                  justify="space-between"
                  style={{ width: '100%' }}
                >
                  <Link to={'/profile/' + item.id.toString()}>
                    <Flex gap={10}>
                      <Avatar
                        size={70}
                        icon={
                          <img
                            src={item.photos.small || userPhoto}
                            alt="avatar"
                            className={s.userPhoto}
                          />
                        }
                      />

                      <Flex vertical>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          {item.name}
                        </Typography.Title>
                        <Typography.Paragraph style={{ margin: 0 }}>
                          {item.status}
                        </Typography.Paragraph>
                      </Flex>
                    </Flex>
                  </Link>

                  {item.followed ? (
                    <Button
                      onClick={() => unfollowOnClick(item.id)}
                      disabled={isDisabled}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={() => followOnClick(item.id)}
                      disabled={isDisabled}
                    >
                      Follow
                    </Button>
                  )}
                </Flex>
              </List.Item>
            )
          }}
        />
      )}
    </>
  )
})

export default Users
