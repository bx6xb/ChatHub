import sprite from '../../assets/svg/sprite.svg'

export const Icon = ({ width = 10, height = 10, id }: IconProps) => {
    return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  >
    <use xlinkHref={`${sprite}#${id}`} />
  </svg>
}

// types
type IconProps = {
    width?: number
    height?: number
    id: string 
}
