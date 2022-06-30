import classes from "./UserInfo.module.scss";
import Avatar from "@ui-kit/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { Card } from "@mui/material";

function UserInfo ({
  nickname,
  avatar,
  userId
  // status,
}) {
  return (
    <NavLink to={`/profile/${userId}`} className={classes.UserInfo__NavLink} >
      <Card className={classes.UserInfo__Container}>
        <div className={classes.UserInfo__Avatar}>
          <Avatar 
            userAvatar={avatar}
            avatarHeight={150}
            avatarWidth={150} 
          />
        </div>
        <div className={classes.UserInfo__Nickname}>
          {nickname}
        </div>
      </Card>
    </NavLink>
  )
}

export default UserInfo;