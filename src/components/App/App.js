import React, { useEffect } from 'react';
import classes from './App.module.css';
import '@assets/styles/preloader.css';
import Navbar from '../Navbar/Navbar';
import Music from '../Music/Music';
import Settings from '../Settings/Settings';
import News from '../News/News';
import {Route} from "react-router-dom";
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import HeaderContainer from '../Header/HeaderContainer';
import Login from "../Login/Login";
import { connect } from 'react-redux';
import { initializeApp } from '@redux/reducers/app-reducer.js';
import Preloader from '../Preloader/Preloader';
import axios from 'axios';
import { ProgressContext } from '@contexts/progress.context';
import GlobalProgress from 'GlobalProgress/GlobalProgress';
import { useProgress } from 'hooks/useProgress';

function App ({
  initializeApp
}) {
  useEffect(() => {
    initializeApp();
  }, [])
  const progress = useProgress();
  return (
    <ProgressContext.Provider value={progress}>
      <GlobalProgress />
      <div className={classes.App__Container}>
        <HeaderContainer />
        <Navbar />
        <div className={classes.App_Content}>
          <Route path="/dialogs" render={ () => <DialogsContainer/>} />              
          <Route path="/profile/:userId?" render={ () => <ProfileContainer />} />
          <Route path="/users" render={ () => <UsersContainer />} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
          <Route path="/news" component={News} />
          <Route path="/login" render={ () => <Login /> } />
        </div>
      </div>
    </ProgressContext.Provider>
  )
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);

