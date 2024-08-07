import { Flex, List, Skeleton } from 'antd'
import s from '../UserItem/UserItem.module.scss'

type UsersSkeletonProps = {
  pageSize: number
}

export const UsersSkeleton = ({ pageSize }: UsersSkeletonProps) => {
  return (
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
  )
}
