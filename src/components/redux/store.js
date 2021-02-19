import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";
import sidebarReducer from "./Sidebar-reducer";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let store = {
  _state: {
    profilePage: {
      postsData: [
        {id: 1, message: "Привет! Yo!", likesCount: 5}, 
        {id: 2, message: "ПРИВЕТ! Круто:)", likesCount: 8}
      ],
      newPostText: ""
    },
   dialogsPage: {
      messagesData: [
        {id: 1, text: "Привет"}, 
        {id: 2, text: "Как дела?"},
        {id: 3, text: "Кодишь?"},
        {id: 4, text: "Учу реакт"},
        {id: 5, text: "Молодец"},
        {id: 6, text: "Учись"}
      ], 
      dialogsData: [
        {id: 1, name: "Женя"}, 
        {id: 2, name: "Виталя"},
        {id: 3, name: "Ксюша"},
        {id: 4, name: "Лена"},
        {id: 5, name: "Аня"},
        {id: 6, name: "Вова"}
      ],
      newMessageBody: ""
    },
    sidebar: ""
  },
  
  getState() {
    return this._state;
  },

  subscribe (observer) {
    this._callSubscriber = observer; // наблюдатель
  },

  _callSubscriber() {
    console.log('Hi')
  },
  dispatch(action) { // {type: "ADD-POST"}
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
 }
}

export const addPostCreator = () => ({
  type: ADD_POST
}); // можно писать в одну строку

export const updateNewPostTextCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT, 
    newText: text 
  }
}
export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
}); // можно писать в одну строку

export const updateNewMessageBodyCreator = (body) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY, 
    body: body 
  }
}

export default store;



