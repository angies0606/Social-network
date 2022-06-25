import classes from "./UserInfo.module.scss";
import Avatar from "@ui-kit/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import Separator from "@ui-kit/Separator/Separator";
import { Card } from "@mui/material";

function UserInfo ({
  nickname,
  avatar,
  userId
  // status,
}) {
  return (
    // <div className={classes.UserInfo__Container}>
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
    // </div>
  )
}

export default UserInfo;