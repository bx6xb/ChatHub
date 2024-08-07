import s from './ErrorElement.module.scss'

type ErrorElementProps = {
  text: string
}

export const ErrorElement = ({ text }: ErrorElementProps) => (
  <div className={s.error}>{text}</div>
)
