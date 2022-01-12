// import React from 'react';
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
  return (<header className={classes.header}>
    <img src='https://www.pinclipart.com/picdir/big/526-5262236_transparent-falling-png-phoenix-egg-png-clipart.png'/>
    <div className={classes.loginBlock}>
      {props.isAuth 
      ? <div> {props.login} <button onClick={props.logout}> Выйти </button> </div>
      : <NavLink to={"/login"}> Войти </NavLink> }
    </div>
</header>)
}

export default Header;