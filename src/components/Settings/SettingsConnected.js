import { connect } from "react-redux";
import { setUserActionCreator } from "@redux/actions/users.actions";
import Settings from "./Settings.jsx";

let mapDispatchToProps = (dispatch) => {
  return {
    changeProfileImage: (user) => {
      dispatch(setUserActionCreator(user));
    } 
  }
};

const SettingsConnected = connect(null, mapDispatchToProps)(Settings);
export default SettingsConnected;