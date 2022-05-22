import {Redirect} from "react-router-dom";
import {useAuthContext} from "@features/auth/auth.context";
import AuthedRoute from "@features/auth/AuthedRoute/AuthedRoute";
import UnauthedRoute from "@features/auth/UnauthedRoute/UnauthedRoute";
import RegisterRoute from "@routes/Register/Register.route";
// import DialogsContainer from "../Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import ProfileRoute from "@routes/ProfileRoute/ProfileRoute";
import Login from "../Login/Login";
import SettingsConnected from "@components/Settings/SettingsConnected.js";


function AppRouting() {
  const {state:{user: authedUser}} = useAuthContext();

  return (
    <>
      <AuthedRoute path='/settings' render={ () => <SettingsConnected authedUser={authedUser}/>} />
      {/* TODO: УБРАТЬ ЗНАК "?". Почему? */}
      <AuthedRoute path='/profile/:userId' render={ () => <ProfileRoute />} />
      {/* TODO: дописать список users */}
      {/* <AuthedRoute path='/users' render={ () => <UsersContainer />} /> */}
      <UnauthedRoute path='/login' render={ () => <Login />} />
      <UnauthedRoute path='/register' render={ () => <RegisterRoute />} />
      <AuthedRoute path='*' render={() => <Redirect to={`/profile/${authedUser._id}`} />}/>
      <UnauthedRoute path='*' render={() => <Redirect to='/login' />}/>
    </>
  )
}

export default AppRouting;