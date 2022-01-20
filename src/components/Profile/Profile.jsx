import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsBlockConnected from "./PostsBlock/PostsBlockConnected";



const Profile = (props) => {
  return (
    <div>
        <ProfileInfo profile={props.profile} status={props.status}
                      updateStatus={props.updateStatus}/>
        <PostsBlockConnected store={props.store} />
      </div>
  )
}

export default Profile;