import { WrappedFieldProps } from "redux-form"
import s from "./FormControls.module.css"

type FormControl = WrappedFieldProps & {
  tag: "input" | "textarea"
  type?: string
}

export const FormControl = (props: FormControl) => {
  const isError = props.meta.error && props.meta.touched

  const Tag = props.tag

  return (
    <>
      <Tag {...props.input} className={isError ? s.inputError : ""} type={props.type} />
      <br />
      {isError && <span className={s.errorSpan}>{props.meta.error}</span>}
    </>
  )
}
