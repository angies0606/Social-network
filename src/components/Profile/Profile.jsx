import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsBlockConnected from "./PostsBlock/PostsBlockConnected";



const Profile = ({
  isForCurrentUser,
  user
}) => {
 
  return (
    <div>
        <ProfileInfo 
          profile={user} 
          // status={props.status}
          // updateStatus={props.updateStatus}
        />
        <PostsBlockConnected
          userId={user._id}
          isForCurrentUser={isForCurrentUser}
        />
      </div>
  )
}

export default Profile;