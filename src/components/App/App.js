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
    // axios.post('http://localhost:8080/users', {name: 'Пелагея404'}, {
    //   headers: {'Content-Type': 'application/json'}
    // });
    // axios.post('http://localhost:8080/posts', {
    //   user: '61f43759841a34f6da91d6da',
    //   text: 'Геральт одобряет!',
    //   image: "https://images.stopgame.ru/uploads/users/2020/579404/r912x500/uRve2ouTkLoBIUqO9iM22g/00029.6cJvjoX.jpg"
    // }, {
    //   headers: {'Content-Type': 'application/json'}
    // });
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
