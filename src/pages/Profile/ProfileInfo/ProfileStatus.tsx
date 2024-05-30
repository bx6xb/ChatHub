import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"

export const ProfileStatus = (props: ProfileStatusProps) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => setEditMode(true)
  const diactivateEditMode = () => setEditMode(false)
  const submitInput = (value: string) => {
    props.setUserStatus(value)
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)
  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitInput(e.currentTarget.value)
      diactivateEditMode()
    }
  }

  return (
    <div>
      {editMode ? (
        <input
          value={status}
          onBlur={diactivateEditMode}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{status || "Add new status"}</span>
      )}
    </div>
  )
}

// types
type ProfileStatusProps = {
  status: string
  setUserStatus: (status: string) => void
}
