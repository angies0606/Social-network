import { connect } from "react-redux";
import { setUserActionCreator } from "@redux/actions/users.actions";
import Settings from "./Settings.jsx";

// let mapStateToProps = (state, ownProps) => {
//   return {
//     userProfileId: state.pages.userPage.user._id
//   }
// };

let mapDispatchToProps = (dispatch) => {
  return {
    changeProfileImage: (user) => {
      dispatch(setUserActionCreator(user));
    } 
  }
};

const SettingsConnected = connect(null, mapDispatchToProps)(Settings);
export default SettingsConnected;