import Avatar from "@ui-kit/Avatar/Avatar";
import { NavLink } from "react-router-dom";

function UserInfo ({
  nickname,
  avatar,
  userId
  // status,
}) {
  return (
    <div>
     <NavLink to={`/profile/${userId}`}>
        {nickname}
      </NavLink>
      <NavLink to={`/profile/${userId}`}>
         <Avatar 
          userAvatar={avatar}
          avatarHeight={150}
          avatarWidth={150} 
        />
      </NavLink>
    </div>
  )
}

export default UserInfo;