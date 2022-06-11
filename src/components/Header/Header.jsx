import classes from "./Header.module.css";
import {useAuthContext} from "@features/auth/auth.context";
import { NavLink } from "react-router-dom";
import Avatar from "@ui-kit/Avatar/Avatar";

const backgroundImage = 'https://www.pinclipart.com/picdir/big/526-5262236_transparent-falling-png-phoenix-egg-png-clipart.png';

const Header = () => {
  const {state: {isAuthed, user}, logout} = useAuthContext();

  return (
    <header className={classes.header}>
      <img src={backgroundImage} />
      <div className={classes.loginBlock}>
        {isAuthed
          ? <div>
              <NavLink to={`/profile/${user._id}`}>
                <Avatar 
                  userAvatar = {user.avatar}
                  avatarHeight = {30}
                  avatarWidth = {30}
                  className={''}
                />
              </NavLink>
              {user.nickname}
              <button onClick={logout}>
                Выйти
              </button>
            </div>
          : <div>
              <Avatar 
                userAvatar = {''}
                avatarHeight = {30}
                avatarWidth = {30}
                className={''}
              />
              <NavLink className={classes.Header__Navlink} to={'/login'}>Войти</NavLink>
              <NavLink className={classes.Header__Navlink} to={'/register'}>Регистрация</NavLink>
            </div>
        }
      </div>
    </header>
  )
}

export default Header;