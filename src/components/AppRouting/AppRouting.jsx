import {useAuthContext} from "@features/auth/auth.context";
import {Redirect} from "react-router-dom";
import AuthedRoute from "@features/auth/AuthedRoute/AuthedRoute";
import UnauthedRoute from "@features/auth/UnauthedRoute/UnauthedRoute";
import RegisterRoute from "@routes/Register/Register.route";
import ProfileRoute from "@routes/ProfileRoute/ProfileRoute";
import Login from "../Login/Login";
import SettingsConnected from "@components/Settings/SettingsConnected.js";
import UsersConnected from "@components/Users-n/Users-nConnected";


function AppRouting() {
  const {state:{user: authedUser}} = useAuthContext();

  return (
    <>
      <AuthedRoute path='/settings' render={() => <SettingsConnected authedUser={authedUser}/>} />
      <AuthedRoute path='/profile/:userId' render={() => <ProfileRoute />} />
      <AuthedRoute path='/users' render={() => <UsersConnected />} />
      <UnauthedRoute path='/login' render={() => <Login />} />
      <UnauthedRoute path='/register' render={() => <RegisterRoute />} />
      <AuthedRoute path='*' render={() => <Redirect to={`/profile/${authedUser._id}`} />} />
      <UnauthedRoute path='*' render={() => <Redirect to='/login' />} />
    </>
  )
}

export default AppRouting;