// import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import {useAuthContext} from '@features/auth/auth.context';

const backgroundImage = "https://www.pinclipart.com/picdir/big/526-5262236_transparent-falling-png-phoenix-egg-png-clipart.png";

const Header = () => {
  const {state: {isAuthed, user}, logout} = useAuthContext();

  return (
    <header className={classes.header}>
      <img src={backgroundImage} />
      <div className={classes.loginBlock}>
        {isAuthed
          ? <div>
              {user.nickname}
              <button onClick={logout}>
                Выйти
              </button>
            </div>
          : <>
              <NavLink to={"/login"}>Войти</NavLink>
              <NavLink to={"/register"}>Регистрация</NavLink>
            </>
        }
      </div>
    </header>
  )
}

export default Header;