import { connect } from "react-redux";
import {getUser} from "@redux/thunks/users.thunks";
import {getUserPageUser} from "@redux/selectors/user.selectors";

let mapStateToProps = (state) => ({ 
  profileUser: getUserPageUser(state)
  // status: state.userData.status,
  // authUserId: state.auth.userId,
  // isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {getUser});