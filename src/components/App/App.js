import React from 'react';
import './App.css';
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

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
    axios.post('http://localhost:8080/users', {name: 'Пелагея404'}, {
      headers: {'Content-Type': 'application/json'}
    });
    
   }
  render() {
    if(this.props.initialized) {
      return Preloader
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={ () => <DialogsContainer/>} />              
          <Route path="/profile/:userId?" render={ () => <ProfileContainer />} />
          <Route path="/users" render={ () => <UsersContainer />} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
          <Route path="/news" component={News} />
          <Route path="/login" render={ () => <Login /> } />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
