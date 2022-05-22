import {useState, useEffect} from "react";
import { useAuthContext } from "@features/auth/auth.context";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [isAuthedUserReady, setIsAuthedUserReady] = useState(false);
  const {state: {user}} = useAuthContext();
  useEffect(() => {
    if(user) {
      setIsAuthedUserReady(true);
    }
  }, [user]);

  return (
    <nav className={classes.nav}>
      {/* <div className={`${classes.item} ${classes.active}`}></div> */}
      {isAuthedUserReady && 
        <div className={classes.item}>
          <NavLink to={`/profile/${user._id}`} activeClassName={classes.active}>Профиль</NavLink>
        </div>
      }
      {/* <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>Сообщения</NavLink>
      </div> */}
      <div className={classes.item}>
        <NavLink to='/users' activeClassName={classes.active}>Пользователи</NavLink>
      </div>
      {/* <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.active}>Новости</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.active}>Музыка</NavLink>
      </div> */}
      {isAuthedUserReady && 
        <div className={classes.item}>
          <NavLink to='/settings' activeClassName={classes.active}>Настройки профиля</NavLink>
        </div>
      }
    </nav>
  )
}

export default Navbar;