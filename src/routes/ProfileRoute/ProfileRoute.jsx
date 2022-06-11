// @ts-nocheck
import {useEffect} from "react";
import {useAuthContext} from "@features/auth/auth.context";
import { useParams } from "react-router-dom";
import Profile from "@components/Profile/Profile";
import ProfileRouteConnect from "./ProfileRoute.connect";

function ProfileRoute({
  profileUser,
  getUser
}) {
  const params = useParams();
  const paramsUserId = params.userId;
  const {state: {user: {_id: authedUserId}}} = useAuthContext();

  useEffect(() => {
    getUser(paramsUserId);
    console.log(params);
  }, [paramsUserId])
  
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

export default ProfileRouteConnect(ProfileRoute);