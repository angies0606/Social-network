import classes from "./ProfileInfo.module.css";
const ProfileInfo = () => {
 return (
   <div>
      <img src="https://s1.1zoom.ru/big3/977/Mountains_Scenery_473520.jpg" className={classes.profileImg}/>
      <div className={classes.descriptionBlock}>
        ava
      </div>
    </div>
  )
}

export default ProfileInfo;