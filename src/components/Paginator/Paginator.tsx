import { useEffect, useState } from 'react'
import s from './Paginator.module.css'

export const Paginator = (props: PaginatorProps) => {
  const [firstPaginatorPage, setFirstPaginatorPage] = useState(
    Math.floor(props.currentPage / 10) * 10 + 1
  )
  const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
  const pages = []

  useEffect(() => {
    setFirstPaginatorPage(Math.floor(props.currentPage / 10) * 10 + 1)
  }, [props.currentPage])

  for (let i = firstPaginatorPage; i < firstPaginatorPage + 10; i++) {
    if (i > pagesCount) {
      break
    }
    pages.push(
      <span
        onClick={() => props.onPageChange(i)}
        key={i}
        className={
          s.page + (props.currentPage === i ? ' ' + s.selectedPage : '')
        }
      >
        {i}
      </span>
    )
  }

  return (
    <div className={s.paginator}>
      <button
        onClick={() => setFirstPaginatorPage(firstPaginatorPage - 10)}
        disabled={firstPaginatorPage === 1}
        className={s.button}
      >
        prev
      </button>
      {pages}
      <div>
        <button
          onClick={() => setFirstPaginatorPage(firstPaginatorPage + 10)}
          disabled={firstPaginatorPage + 10 >= pagesCount}
          className={s.button}
        >
          next
        </button>
      </div>
    </div>
  )
}

// types
type PaginatorProps = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}
