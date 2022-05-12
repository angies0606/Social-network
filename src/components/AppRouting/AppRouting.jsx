import {Route, Redirect, Switch} from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import ProfileRoute from '@routes/ProfileRoute/ProfileRoute';
import Login from '../Login/Login';
import AuthedRoute from '@features/auth/AuthedRoute/AuthedRoute';
import UnauthedRoute from '@features/auth/UnauthedRoute/UnauthedRoute';
import RegisterRoute from '@routes/Register/Register.route';
import {useAuthContext} from '@features/auth/auth.context';


function AppRouting() {
  const {state:{user}} = useAuthContext();

  return (
    <>
      <AuthedRoute path='/dialogs' render={ () => <DialogsContainer/>} />
      {/* TODO: УБРАТЬ ЗНАК "?". Почему? */}
      <AuthedRoute path='/profile/:userId?' render={ () => <ProfileRoute />} />
      <AuthedRoute path='/users' render={ () => <UsersContainer />} />
      <UnauthedRoute path='/login' render={ () => <Login /> } />
      <UnauthedRoute path='/register' render={ () => <RegisterRoute /> } />
      <AuthedRoute path='*' render={() => <Redirect to={`/profile/${user._id}`} />}/>
      <UnauthedRoute path='*' render={() => <Redirect to='/login' />}/>
    </>
  )
}

export default AppRouting;