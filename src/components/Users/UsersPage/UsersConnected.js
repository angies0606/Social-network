import {
  addUsersActionCreator
} from "@redux/actions/users.actions";
import { connect } from "react-redux";
import Users from "./Users.jsx";

let mapStateToProps = (state) => {
  return {
    users: state.pages.usersPage.users.map(userId => state.entities.users[userId])
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
   addUsers: (users) => {
      dispatch(addUsersActionCreator(users));
    }
  }
};

const UsersConnected = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersConnected;