// import React from 'react';
import './App.css';
import './assets/styles/preloader.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import {Route} from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = (props) => {
  return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={ () => <DialogsContainer store={props.store} />} />              
          <Route path="/profile/:userId?" render={ () => <ProfileContainer store={props.store} />} />
          <Route path="/users" render={ () => <UsersContainer store={props.store} />} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
          <Route path="/news" component={News} />
        </div>
      </div>
  );
}

export default App;
