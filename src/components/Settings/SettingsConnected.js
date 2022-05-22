import { connect } from "react-redux";
import Settings from "./Settings.jsx";
import { setUserActionCreator } from "@redux/actions/user.actions";

//TODO: упразднить компонент?
let mapStateToProps = (state, ownProps) => {
  return {
   userProfileId: state.pages.userPage.user._id
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    changeProfileImage: (user) => {
      dispatch(setUserActionCreator(user));
    } 
  }
}

const SettingsConnected = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsConnected;