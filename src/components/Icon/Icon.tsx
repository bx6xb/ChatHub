import iconsSprite from '../../assets/svg/sprite.svg'

export const Icon = ({ width = '50', height = '50', ...props }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={props.viewBox || `0 0 ${width} ${height}`}
      fill={props.fillColor}
      xmlns="http://www.w3.org/2000/svg">
      <use xlinkHref={`${iconsSprite}#${props.iconId}`} />
    </svg>
  )
}

// types
type IconProps = {
  iconId: string
  width?: string
  height?: string
  fillColor?: string
  viewBox?: string
}
