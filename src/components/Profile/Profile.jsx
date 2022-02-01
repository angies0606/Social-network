import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsBlockConnected from "./PostsBlock/PostsBlockConnected";



const Profile = (props) => {
  return (
    <div>
        <ProfileInfo 
          profile={props.profile} 
          status={props.status}
          updateStatus={props.updateStatus}
        />
        <PostsBlockConnected  
          authUserId={"61f43759841a34f6da91d6da"} //TODO: id будет совершенно другой - убрать заглушку
        />
      </div>
  )
}

export default Profile;