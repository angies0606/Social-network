import { NavLink } from "react-router-dom";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {updateNewMessageBodyCreator, sendMessageCreator} from "../redux/Dialogs-reducer";

const Dialogs = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
  let messagesElements = state.messagesData.map(message => <Message text={message.text} key={message.id}/>);
  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  }
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
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
        <div>
          <div>
            <textarea placeholder="Добавьте сообщение" value={newMessageBody} onChange={onNewMessageChange}></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Отправить</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dialogs;