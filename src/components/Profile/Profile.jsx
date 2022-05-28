import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsBlockConnected from "./PostsBlock/PostsBlockConnected";



const Profile = ({
  isForCurrentUser,
  profileUser
}) => {
 
  return (
    <div>
        <ProfileInfo 
          profileUser={profileUser} 
          // status={props.status}
          // updateStatus={props.updateStatus}
        />
        <PostsBlockConnected
          profileUser={profileUser}
          profileUserId={profileUser._id}
          isForCurrentUser={isForCurrentUser}
        />
      </div>
  )
}

export default Profile;