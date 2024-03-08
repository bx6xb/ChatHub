import { Dialogs } from "./Dialogs"
import { addMessageAC, updateNewMessageAC } from "../../redux/dialogsReducer"
import { connect } from "react-redux"
import { AppRootStateType, DispatchType } from "../../redux/reduxStore"

const mapStateToProps = (state: AppRootStateType) => ({
  dialogsPage: state.dialogsPage,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  sendMessage() {
    dispatch(addMessageAC())
  },
  updateNewMessage(text: string) {
    let action = updateNewMessageAC(text)
    dispatch(action)
  },
})

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
