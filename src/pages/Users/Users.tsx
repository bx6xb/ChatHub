import userPhoto from '../../assets/images/userDefaultPhoto.png'
import s from './Users.module.scss'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  List,
  Pagination,
  Skeleton
} from 'antd'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { useEffect } from 'react'
import { follow, getUsers, unfollow } from '../../store/users/asyncActions'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { changePageSize } from '../../store/users/reducer'
import { Colors } from '../../styles/Colors'
import { useTranslation } from 'react-i18next'
import { selectUsersState } from '../../store/users/selectors'

const Users = withAuthRedirect(() => {
  // get data from the state
  const {
    pageSize,
    totalUsersCount,
    currentPage,
    isFollowingInProgress,
    isFetching,
    users
  } = useAppSelector(selectUsersState)

  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t } = useTranslation()

  // get users on page size change
  useEffect(() => {
    dispatch(getUsers({ pageSize, currentPage }))
  }, [pageSize])

  // callbacks
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
    dispatch(changePageSize(pageSize))
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Colors.white,
          colorText: Colors.primary,
          colorBgContainer: Colors.transparent,
          colorBorder: Colors.primary,
          colorSplit: Colors.white
        }
      }}
    >
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
        <List
          itemLayout="horizontal"
          dataSource={Array(pageSize).fill({})}
          renderItem={() => (
            <List.Item className={s.user}>
              <Flex align="start" justify="space-between">
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
              <List.Item className={s.user}>
                <Flex align="start" justify="space-between" wrap>
                  {/* user card */}
                  <Link to={'/profile/' + item.id.toString()}>
                    <Flex gap={10}>
                      <Avatar
                        size={70}
                        className={s.userPhoto}
                        icon={
                          <img
                            src={item.photos.small || userPhoto}
                            alt="avatar"
                          />
                        }
                      />

                      <Flex vertical>
                        <Typography.Title level={5}>
                          {item.name}
                        </Typography.Title>
                        <Typography.Paragraph>
                          {item.status}
                        </Typography.Paragraph>
                      </Flex>
                    </Flex>
                  </Link>

                  {/* button */}
                  {item.followed ? (
                    <Button
                      onClick={() => unfollowOnClick(item.id)}
                      disabled={isDisabled}
                    >
                      {t('Users_unfollow')}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => followOnClick(item.id)}
                      disabled={isDisabled}
                    >
                      {t('Users_follow')}
                    </Button>
                  )}
                </Flex>
              </List.Item>
            )
          }}
        />
      )}
    </ConfigProvider>
  )
})

export default Users
