import { connect } from "react-redux";
// import {  getUserProfile, getUserStatus, updateUserStatus } from "@redux/reducers/UserData-reducer.js";
import {getUser} from '@redux/thunks/users.thunks';
import {getUserPageUser} from '@redux/selectors/user.selectors';

let mapStateToProps = (state) => ({ //TODO: переписать, когда буду настраивать авторизацию
  user: getUserPageUser(state)
  // status: state.userData.status,
  // authUserId: state.auth.userId,
  // isAuth: state.auth.isAuth
});

// let mapStateToProps = (state) => ({ //TODO: переписать, когда буду настраивать авторизацию
//   profile: state.userData.profile,
//   status: state.userData.status,
//   // authUserId: state.auth.userId,
//   // isAuth: state.auth.isAuth
// });

export default connect(mapStateToProps, {getUser});