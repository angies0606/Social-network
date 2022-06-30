import classes from "./Navbar.module.css";
import { useAuthContext } from "@features/auth/auth.context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const {state: {user}} = useAuthContext();

  return (
    <nav className={classes.Navbar__Box}>
      {!user
        ? null 
        : <>
          <div className={classes.Navbar__Link}>
            <NavLink to={`/profile/${user?._id}`} activeClassName={classes.active}>Профиль</NavLink>
          </div>
          <div className={classes.Navbar__Link}>
            <NavLink to='/users' activeClassName={classes.active}>Пользователи</NavLink>
          </div>
           <div className={classes.Navbar__Link}>
            <NavLink to='/settings' activeClassName={classes.active}>Настройки профиля</NavLink>
          </div>
        </>
      }
    </nav>
  )
}

export default Navbar;