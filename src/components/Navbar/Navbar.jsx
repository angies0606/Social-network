import classes from "./Navbar.module.css";
import { useAuthContext } from "@features/auth/auth.context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const {state: {user}} = useAuthContext();

  return (
    <nav className={classes.nav}>
      {/* <div className={`${classes.item} ${classes.active}`}></div> */}
      {!user
        ? null 
        : <>
          <div className={classes.item}>
            <NavLink to={`/profile/${user?._id}`} activeClassName={classes.active}>Профиль</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to='/users' activeClassName={classes.active}>Пользователи</NavLink>
          </div>
           <div className={classes.item}>
            <NavLink to='/settings' activeClassName={classes.active}>Настройки профиля</NavLink>
          </div>
        </>
      }
    </nav>
  )
}

export default Navbar;