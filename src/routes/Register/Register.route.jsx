import classes from "@components/common/FormsControls/FormsControls.module.css";
import { useAuthContext } from "@features/auth/auth.context";
import { required } from "@utils/validators/validators";
import { Field, reduxForm } from "redux-form";
import { Input } from "@components/common/FormsControls/FormsControls";

const RegisterForm = (props) => {
  return <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name={'name'} placeholder={'Имя'} component={Input}
            validate={[required]} />
        </div>
        <div>
          <Field name={'nickname'} placeholder={'Логин'} component={Input}
            validate={[required]} />
        </div>
        <div>
         <Field name={'password'} placeholder={'Пароль'} component={Input}
          validate={[required]} type={'password'}  />
        </div>
        { props.error &&
          <div className={classes.formSummaryError}>
            {props.error}
          </div>
        }
        <div>
          <button>Зарегистрироваться</button>
        </div>
        <div></div>
      </form>
    </div>
}

const RegisterReduxForm = reduxForm({
  form: 'login'
})(RegisterForm);

function RegisterRoute() {
  const {register} = useAuthContext();

  const onSubmit = (formData) => {
    register(formData.name, formData.nickname, formData.password);
  };
  
  return (
    <div>
      <h1>
        Регистрация
      </h1>
      <RegisterReduxForm onSubmit={onSubmit}/>
    </div>
  )
}

export default RegisterRoute;