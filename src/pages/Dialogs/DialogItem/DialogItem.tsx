import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.scss'

export const DialogItem = (props: DialogItemProps) => {
  return (
    <div>
      <NavLink
        to={`/dialogs/${props.id}`}
        className={({ isActive }) =>
          isActive ? s.dialogsItems + ' ' + s.active : ''
        }
      >
        {props.name}
      </NavLink>
    </div>
  )
}

// types
type DialogItemProps = {
  id: number
  name: string
}
