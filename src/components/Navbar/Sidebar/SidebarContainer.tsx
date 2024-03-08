import { connect } from "react-redux"
import { Sidebar } from "./Sidebar"
import { AppRootStateType } from "../../../redux/reduxStore"

const mapStateToProps = (state: AppRootStateType) => ({
  friends: state.sidebar.friends,
})

export const SidebarContainer = connect(mapStateToProps)(Sidebar)
