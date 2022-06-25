// import classes from "@components/common/FormsControls/FormsControls.module.css";
import classes from "./Login.route.module.scss";
import { useAuthContext } from "@features/auth/auth.context";
import { Field, reduxForm } from "redux-form";
import { validate } from "@utils/validators/validators";
import { Input } from "@components/common/FormsControls/FormsControls";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@ui-kit/Button/Button";

const LoginForm = (props) => {
  return (
        <form>
          <div>
            <Field 
              classname={classes.Login__Field}
              name={'login'} 
              placeholder={'Логин'} 
              component={Input}
              style={{width: 200, height: 25}}
            />
          </div>
          {/* <div>
            <Field 
              classname={classes.Login__Field}
              name={'nickname'} 
              placeholder={'Логин'} 
              component={Input}
              style={{width: 200, height: 25}}
            />
          </div> */}
          <div>
           <Field 
              classname={classes.Login__Field}
              name={'password'} 
              placeholder={'Пароль'} 
              component={Input}
              type={'password'}  
              style={{width: 200, height: 25, marginTop: 10}}
            />
          </div>
          {/* <div>
            <Field name={"rememberMe"} type={"checkbox"} component={Input}/>
              Запомнить меня
          </div> */}
          { props.error &&
            <div className={classes.formSummaryError}>
              {props.error}
            </div>
          }
          <div className={classes.Login__ButtonContainer}>
            <Button
              className={classes.Login__Button}
              color='success'
              variant='outlined'
              onClick={props.handleSubmit}
            >
              Войти
            </Button>
          </div>
        </form>
  )
};

const LoginReduxForm = reduxForm({
  form: "LoginForm",
  validate: validate
})(LoginForm);

const Login = () => {
  const {login} = useAuthContext();

  const onSubmit = (formData) => {
    login(formData.login, formData.password);
  }

  return (
    <Card className={classes.Login__Container}>
      <CardHeader title={'Войти'}>
      </CardHeader>
      <CardContent className={classes.Login__FormBox}>
        <LoginReduxForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  )
}

export default Login;
