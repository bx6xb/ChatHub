import preloader from "../../assets/svg/preloader.svg"
import s from "./Preloader.module.css"

export const Preloader = () => {
  return <img src={preloader} alt="preloader" className={s.preloader} />
}
