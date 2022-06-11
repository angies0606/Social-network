import classes from "./ProfileInfo.module.scss";
import Avatar from "@ui-kit/Avatar/Avatar";
import Preloader from "../../../ui-kit/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({
  profileUser
}) => {
  //TODO: сделать статус - 
  if (!profileUser) {
  return Preloader;
 } 
   return (
   <div>
      {profileUser.banner && 
        <img 
          src={profileUser.banner} 
          className={classes.profileImg}
        />
      }
      <div>
        {profileUser.nickname}
      </div>
      <div className={classes.descriptionBlock}>
       <Avatar
        // className={classes.ProfileInfo__Avatar}
        userAvatar={profileUser.avatar}
        avatarHeight={200}
        avatarWidth={200}
      />
       {/* <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} /> */}
       status
      </div>
    </div>
  )
 }
export default ProfileInfo;