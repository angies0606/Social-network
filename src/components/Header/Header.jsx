import classes from "./Header.module.css";
import classNames from "classnames";
import { useAuthContext } from "@features/auth/auth.context";
import { NavLink } from "react-router-dom";
import Avatar from "@ui-kit/Avatar/Avatar";
import IconButton from "ui-kit/IconButton/IconButton.jsx";
import LogoutIcon from "@mui/icons-material/Logout";
import Label from "@assets/images/postikLabel.png";

const Header = () => {
  const {state: {isAuthed, user}, logout} = useAuthContext();

  return (
    <>
      <div className={classes.Header__Label}>
        <img src={Label} />
      </div>
      <div className={classes.Header__LoginBlock}>
        {isAuthed
          ? <>
              <div className={classes.Header__UserInfo}>
                <NavLink to={`/profile/${user._id}`}>
                  <Avatar 
                    userAvatar = {user.avatar}
                    avatarHeight = {40}
                    avatarWidth = {40}
                    className={''}
                  />
                </NavLink> 
                <NavLink 
                  className={classes.Header__NavLink} 
                  to={`/profile/${user._id}`}
                >
                  <div className={classes.Header__Nickname}>
                    {user.nickname}
                  </div>
                </NavLink>
              </div>
              <div className={classes.Header__Options}>
                <IconButton onClick={logout}>
                  <LogoutIcon className={classes.Header__LogoutIcon}/>
                </IconButton>
              </div>
            </>
          : <>
              <div className={classes.Header__UserInfo}>
                <Avatar 
                  userAvatar = {''}
                  avatarHeight = {40}
                  avatarWidth = {40}
                  className={''}
                />
              </div>
              <div className={classes.Header__Options}>
                <NavLink className={classNames(classes.Header__NavLink, classes.Header__LoginLink)} to={'/login'}>Войти</NavLink>
                <NavLink className={classes.Header__NavLink} to={'/register'}>Регистрация</NavLink>
              </div>
            </> 
        }
      </div>
    </>
  )
}

export default Header;