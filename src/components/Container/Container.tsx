import { ComponentPropsWithoutRef, ReactNode } from 'react'
import s from './Container.module.css'

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div className={`${s.container} ${className}`} {...props}>
      {children}
    </div>
  )
}

// types
type ContainerProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>
