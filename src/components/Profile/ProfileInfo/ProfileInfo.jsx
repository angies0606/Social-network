import Preloader from "../../Preloader/Preloader";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
 if (!props.profile) {
  return Preloader;
 }

  return (
   <div>
      <img src="https://s1.1zoom.ru/big3/977/Mountains_Scenery_473520.jpg" className={classes.profileImg}/>
      <div className={classes.descriptionBlock}>
       <img src={props.profile.photos.large} />
       ava
      </div>
    </div>
  )
}

export default ProfileInfo;