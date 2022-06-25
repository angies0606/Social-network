import classes from "./ProfileInfo.module.scss";
import Avatar from "@ui-kit/Avatar/Avatar";
import Preloader from "../../../ui-kit/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DefaultBanner from "@assets/images/defaultBanner.jpg";

const ProfileInfo = ({
  profileUser
}) => {
  //TODO: сделать статус - 
  if (!profileUser) {
    return Preloader;
  } 

  return (
   <div className={classes.ProfileInfo__UserInfo}>
      {profileUser.banner ?
        <img 
          src={profileUser.banner} 
          className={classes.ProfileInfo__Banner}
        />
        :  <img 
            src={DefaultBanner} 
            className={classes.ProfileInfo__Banner}
          />
      }
      <div className={classes.ProfileInfo__Avatar}>
        <Avatar
          // className={classes.ProfileInfo__Avatar}
          userAvatar={profileUser.avatar}
          avatarHeight={150}
          avatarWidth={150}
        />
      </div>
      <div className={classes.ProfileInfo__Nickname}>
        {profileUser.nickname}
      </div>
        {/* <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} /> */}
        {/* status */}
    </div>
  )
 }
export default ProfileInfo;