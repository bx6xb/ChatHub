import { ThemeConfig } from 'antd'
import { Colors } from '../styles/Colors'

export const AppTheme: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: Colors.transparent,
      activeBarBorderWidth: 0,
      itemSelectedColor: Colors.black,
      itemColor: Colors.black
    },
    Button: {
      // default
      defaultBg: Colors.primary,
      defaultColor: Colors.white,
      defaultBorderColor: Colors.primary,
      // hover
      defaultHoverBg: Colors.secondary,
      defaultHoverColor: Colors.white,
      defaultHoverBorderColor: Colors.white,
      // active
      defaultActiveBg: Colors.secondary,
      defaultActiveColor: Colors.primary,
      defaultActiveBorderColor: Colors.primary
    },
    Typography: {
      colorTextHeading: Colors.white,
      colorText: Colors.white
    }
  }
}
