// @ts-nocheck
import {useEffect} from "react";
import Profile from "@components/Profile/Profile";
import { useParams } from "react-router-dom";
import ProfileRouteConnect from "./ProfileRoute.connect";
import {useAuthContext} from "@features/auth/auth.context";


function ProfileRoute({
  profileUser,
  getUser
}) {
  const paramsUserId = useParams().userId;
  const {state: {user: {_id: authedUserId}}} = useAuthContext();
  const params = useParams()

  
  useEffect(() => {
    getUser(paramsUserId);
    console.log(params);
  }, [])
  
  // componentDidMount() {
  //   let userId = this.props.match.params.userId
  //   if (!userId) {
  //     userId = this.props.authUserId;
  //   }
  //   this.props.getUserProfile(userId);
  //   this.props.getUserStatus(userId);
  // }
  if (!profileUser) return null;
  
  return (
    <>
      <Profile
        // {...props}
        profileUser={profileUser}
        isForCurrentUser={authedUserId === profileUser._id}
        // status={this.props.status}
        status=''
        // updateStatus={this.props.updateUserStatus}
        updateStatus={() => {}}
      />
    </>
  )
}

{/* <Profile 
        {...this.props} 
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateUserStatus}
      />
    </>
  ) */}

// let mapStateToProps = (state) => ({ //TODO: переписать, когда буду настраивать авторизацию
//     profile: state.userData.profile,
//     status: state.userData.status,
//     // authUserId: state.auth.userId,
//     // isAuth: state.auth.isAuth
// });

// export default compose(
//   connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus})
// )(ProfileRoute);

export default ProfileRouteConnect(ProfileRoute);