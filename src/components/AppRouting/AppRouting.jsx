import {Route, Redirect} from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import ProfileRoute from '@routes/ProfileRoute/ProfileRoute';
import Login from '../Login/Login';
import AuthedRoute from '@features/auth/AuthedRoute/AuthedRoute';
import UnauthedRoute from '@features/auth/UnauthedRoute/UnauthedRoute';


function AppRouting() {
  return (
    <>
      <AuthedRoute path='/dialogs' render={ () => <DialogsContainer/>} />              
      <AuthedRoute path='/profile/:userId?' render={ () => <ProfileRoute />} />
      <AuthedRoute path='/users' render={ () => <UsersContainer />} />
      <UnauthedRoute path='/login' render={ () => <Login /> } />
      <AuthedRoute path='*' render={() => <Redirect to='/profile' />}/>
      <UnauthedRoute path='*' render={() => <Redirect to='/login' />}/>
    </>
  )
}

export default AppRouting;