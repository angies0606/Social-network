import { connect } from "react-redux";
import {getUserActionCreator} from "@redux/thunks/users.thunks";
import {getUserPageUser} from "@redux/selectors/user.selectors";
import {setUserActionCreator} from '@redux/actions/users.actions';

let mapStateToProps = (state) => ({ 
  profileUser: getUserPageUser(state)
  // status: state.userData.status,
  // authUserId: state.auth.userId,
  // isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => dispatch(setUserActionCreator(null)),
    getUser: (userId) => dispatch(getUserActionCreator(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps);