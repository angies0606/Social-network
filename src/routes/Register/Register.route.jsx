import classes from "./Register.route.module.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "@features/auth/auth.context";
import { validate } from "@utils/validators/validators";
import { Field, reduxForm } from "redux-form";
import { Input } from "@components/common/FormsControls/FormsControls";
import InfoDialog from "@ui-kit/InfoDialog/InfoDialog";
import { useProgressContext } from "@features/progress/progress.context";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@ui-kit/Button/Button";

const RegisterForm = (props) => {
  return (
      <form>
        <div>
          <Field 
            classname={classes.Register__Field}
            name={'nickname'} 
            placeholder={'Логин'} 
            component={Input}
            style={{width: 200, height: 25}} 
          />
        </div>
        <div>
          <Field 
            classname={classes.Register__Field}
            name={'email'} 
            placeholder={'Email'} 
            component={Input}
            type={'email'}
            style={{width: 200, height: 25, marginTop: 10}}
          />
        </div>
        <div>
         <Field 
            classname={classes.Register__Field}
            name={'password'} 
            placeholder={'Пароль'} 
            component={Input}
            type={'password'}  
            style={{width: 200, height: 25, marginTop: 10}}
          />
        </div>
        { props.error &&
          <div className={classes.formSummaryError}>
            {props.error}
          </div>
        }
        <div className={classes.Register__ButtonContainer}>
          <Button
            className={classes.Register__Button}
            color='success'
            variant='outlined'
            onClick={props.handleSubmit}
          >
            Подтвердить
          </Button>
        </div> 
      </form>
  )
}

const RegisterReduxForm = reduxForm({
  form: 'register',
  validate: validate
})(RegisterForm);

function RegisterRoute() {
  const {register} = useAuthContext();
  const {isProgress} = useProgressContext();
  const [isShown, setIsShown] = useState(false);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  const history = useHistory();
  const onSubmit = (formData) => {
    register(formData.email, formData.nickname, formData.password)
     .then(() => {
      setIsRegisterSuccessful(true);
      setIsShown(true);
     });
  };

  const onClose = () => {
    if(isRegisterSuccessful) {
      setIsRegisterSuccessful(false);
      setIsShown(false);
      history.push('/login');
    } else {
      setIsShown(false);
    }
  };

  return (
    <>
    <Card className={classes.Register__Container}>
      <CardHeader title={'Регистрация'} />
      <CardContent className={classes.Register__FormBox}>
        <RegisterReduxForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  
    <InfoDialog 
      isShown={isShown}
      title={''}
      isProgress={isProgress}
      onClose={onClose}
      message={'Вы успешно зарегистрировались! Выполните вход в свой профиль'}
    />
    </>
  )
}

export default RegisterRoute;