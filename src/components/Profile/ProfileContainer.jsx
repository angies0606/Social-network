
import {useEffect} from "react";
import { connect } from "react-redux";
import {  getUserProfile, getUserStatus, updateUserStatus } from "@redux/reducers/UserData-reducer.js";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import { compose } from "redux";

function ProfileContainer({

}) {
  const params = useParams();

  useEffect(() => {
    
  }, [])
  
  // componentDidMount() {
  //   let userId = this.props.match.params.userId
  //   if (!userId) {
  //     userId = this.props.authUserId;
  //   }
  //   this.props.getUserProfile(userId);
  //   this.props.getUserStatus(userId);
  // }
  
  return (
    <>
      <Profile 
        {...this.props} 
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateUserStatus}
      />
    </>
  )
}

let mapStateToProps = (state) => ({ //TODO: переписать, когда буду настраивать авторизацию
    profile: state.userData.profile,
    status: state.userData.status,
    // authUserId: state.auth.userId,
    // isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus})
)(ProfileContainer);