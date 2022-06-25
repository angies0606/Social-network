import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsBlockConnected from "./PostsBlock/PostsBlockConnected";

const Profile = ({
  isForCurrentUser,
  profileUser
}) => {
  return (
    <div className={classes.Profile__Container}>
      <ProfileInfo 
        profileUser={profileUser} 
        // status={props.status}
        // updateStatus={props.updateStatus}
      />
      <PostsBlockConnected
        profileUser={profileUser}
        isForCurrentUser={isForCurrentUser}
      />
    </div>
  )
}

export default Profile;