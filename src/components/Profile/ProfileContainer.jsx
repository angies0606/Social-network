
import React from "react";
import { connect } from "react-redux";
import {  getUserProfile, getUserStatus, updateUserStatus } from "@redux/reducers/Profile-reducer.js";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirectComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }
  render() {
    return <div>
    <Profile {...this.props} profile={this.props.profile} status={this.props.status}
              updateStatus={this.props.updateUserStatus}/>
    </div>
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
  withRouter,
  withAuthRedirectComponent
)(ProfileContainer);