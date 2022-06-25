import { useAuthContext } from "@features/auth/auth.context";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthedRoute from "@features/auth/AuthedRoute/AuthedRoute";
import UnauthedRoute from "@features/auth/UnauthedRoute/UnauthedRoute";
import RegisterRoute from "@routes/Register/Register.route";
import ProfileRoute from "@routes/ProfileRoute/ProfileRoute";
import Login from "../Login/Login.route";
import SettingsConnected from "@components/Settings/SettingsConnected.js";
import UsersConnected from "@components/Users/UsersConnected.js";


function AppRouting() {
  const {state: {user: authedUser, isAuthed, isInitialized}} = useAuthContext();

  if (!isInitialized) {
    return null;
  }

  return (
    <Switch>
      {isAuthed && <Route path='/settings' render={() => <SettingsConnected authedUser={authedUser}/>} />}
      {isAuthed && <Route path='/profile/:userId' render={() => <ProfileRoute />}/>}
      {isAuthed && <Route path='/users' render={() => <UsersConnected />}/>}
      {isAuthed && <Route path='*' render={() => <Redirect to={`/profile/${authedUser._id}`} />} />}

      {!isAuthed && <Route path='/login' render={() => <Login />} />}
      {!isAuthed && <Route path='/register' render={() => <RegisterRoute />} />}
      {!isAuthed && <Route path='*' render={() => <Redirect to='/login' />} />}
    </Switch>
  )
}

export default AppRouting;