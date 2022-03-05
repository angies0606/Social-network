
import { connect } from "react-redux";
import { compose } from "redux";
import {sendMessageCreator} from "@redux/reducers/Dialogs-reducer.js";
import Dialogs from "./Dialogs";


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);