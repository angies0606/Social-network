
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
const Dialogs = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
  let messagesElements = state.messagesData.map(message => <Message text={message.text} key={message.id}/>);
  // let newMessageBody = state.newMessageBody;

  // let onSendMessageClick = () => {
  //   props.sendMessage();
  // }
  // let onNewMessageChange = (e) => {
  //   let body = e.target.value;
  //   props.updateNewMessageBody(body);
  // }
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);

  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={classes.messages}>
        <div>
          {messagesElements}
        </div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
  )
}
const maxLenght50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          <Field name="newMessageBody" component={Textarea} placeholder="Добавьте сообщение"
            validate={[required, maxLenght50]}/>
      </div>
      <div>
          <button>Отправить</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs;