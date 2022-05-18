import Avatar from "@ui-kit/Avatar/Avatar";
import Preloader from "../../Preloader/Preloader";
import classes from "./ProfileInfo.module.scss";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({
  profile
}) => {
  //TODO: сделать аву и статус - 
  if (!profile) {
  return Preloader;
 } 
   return (
   <div>
      
      <img 
        src={profile.banner} 
        className={classes.profileImg}
      />
      <div>
        {profile.nickname}
      </div>
      <div className={classes.descriptionBlock}>
       <Avatar
        // className={classes.ProfileInfo__Avatar}
        userAvatar={profile.avatar}
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