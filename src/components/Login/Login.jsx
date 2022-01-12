import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../redux/auth-reducer";
import classes from "../common/FormsControls/FormsControls.module.css"

const LoginForm = (props) => {
  return <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name={"email"} placeholder={"e-mail"} component={Input}
            validate={[required]} />
        </div>
        <div>
         <Field name={"password"} placeholder={"Пароль"} component={Input}
          validate={[required]} type={"password"}  />
        </div>
        <div>
          <Field name={"rememberMe"} type={"checkbox"} component={Input}/>
            Запомнить меня
        </div>
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
}

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  }
  if(props.isAuth) {
    return <Redirect to={"/profile"} />
  }
  return <div>
      <h1>
        LOGIN
      </h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
}) 
  

export default connect(mapStateToProps, {login}) (Login);
