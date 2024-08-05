import profileBg1 from '../../assets/profileBgs/1.jpg'
import profileBg2 from '../../assets/profileBgs/2.jpg'
import profileBg3 from '../../assets/profileBgs/3.jpg'
import profileBg4 from '../../assets/profileBgs/4.jpg'
import profileBg5 from '../../assets/profileBgs/5.jpg'
import profileBg6 from '../../assets/profileBgs/6.jpg'
import profileBg7 from '../../assets/profileBgs/7.jpg'
import profileBg8 from '../../assets/profileBgs/8.jpg'
import profileBg9 from '../../assets/profileBgs/9.jpg'
import profileBg10 from '../../assets/profileBgs/10.jpg'
import { getRandomNumber } from './getRandomNumber'

const bgs = [
  profileBg1,
  profileBg2,
  profileBg3,
  profileBg4,
  profileBg5,
  profileBg6,
  profileBg7,
  profileBg8,
  profileBg9,
  profileBg10
]

export const getRandomProfileBg = () => bgs[getRandomNumber(0, bgs.length - 1)]
