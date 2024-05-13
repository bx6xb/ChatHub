import { ChangeEvent, KeyboardEvent, useState } from "react"

type ProfileStatusProps = {
  status: string
  getStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusProps) => {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(props.status)

  const activateEditMode = () => setEditMode(true)
  const diactivateEditMode = () => setEditMode(false)
  const submitInput = (value: string) => {
    props.getStatus(value)
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
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
          value={inputValue}
          onBlur={diactivateEditMode}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{inputValue}</span>
      )}
    </div>
  )
}
