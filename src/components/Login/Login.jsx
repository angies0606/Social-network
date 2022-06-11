import classes from "@components/common/FormsControls/FormsControls.module.css";
import {useAuthContext} from "@features/auth/auth.context";
import { Field, reduxForm } from "redux-form";
import { required } from "@utils/validators/validators";
import { Input } from "@components/common/FormsControls/FormsControls";

const LoginForm = (props) => {
  return <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name={'nickname'} placeholder={'Логин'} component={Input}
            validate={[required]} />
        </div>
        <div>
         <Field name={'password'} placeholder={'Пароль'} component={Input}
          validate={[required]} type={'password'}  />
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
        <div>
          <button>Войти</button>
        </div>
        <div></div>
      </form>
    </div>
};

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = () => {
  const {login} = useAuthContext();

  const onSubmit = (formData) => {
    login(formData.nickname, formData.password);
  }

  return (
    <div>
      <h1>
        LOGIN
      </h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}

export default Login;
