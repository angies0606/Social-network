import dialogsReducer from "../reducers/Dialogs-reducer";
import profileReducer from "../reducers/UserData-reducer";
import sidebarReducer from "../reducers/Sidebar-reducer";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  pages: {
    userPage: {
      user: null,
      posts: [],
      // status: '',
      // avatar: ''
    },
    usersPage: {
      users: []
    }
  },
  entities: { //TODO: добавить еще сущностей типа user и т.д
    posts: {
      // firstPost: {
      //   id: 'firstPost',
      //   text: 'Геральт одобряет!',
      //   img: "https://images.stopgame.ru/uploads/users/2020/579404/r912x500/uRve2ouTkLoBIUqO9iM22g/00029.6cJvjoX.jpg",
      //   likes: 2,
      //   comments: []
      // },
      // secondPost: {
      //   id: 'secondPost',
      //   text: 'Италия',
      //   img: "https://cdnimg.rg.ru/img/content/209/42/39/photorep_imageid_552850_8b1e965e83015c21588762884_d_850.jpg",
      //   likes: 5,
      //   comments: []
      // }
    },
    comments: {
      // comment1: {
      //   id: 'comment1',
      // user: "kfkfkfkId",
      // post: 'hfhfhfId',
      //   text: ''
      // }
    },
    users: {
      
    }
  },
  // usersPage: {
  //   users: [],
  //   pageSize: 5,
  //   totalUsersCount: 0,
  //   currentPage: 1,
  //   isFetching: false,
  //   followingInProgress: []
  // },
  // sidebar: "",
  //   getState() {
  //     return this._state;
  //   },

  //   subscribe (observer) {
  //     this._callSubscriber = observer; // наблюдатель
  //   },

  //   _callSubscriber() {
  //     console.log('Hi')
  //   },
  //   dispatch(action) { // {type: "ADD-POST"}
  //     this._state.profilePage = profileReducer(this._state.profilePage, action);
  //     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
  //     this._state.sidebar = sidebarReducer(this._state.sidebar, action);
  //     this._callSubscriber(this._state);
  //  }
}

// export const addPostCreator = () => ({
//   type: ADD_POST
// }); // можно писать в одну строку

// export const updateNewPostTextCreator = (text) => {
//   return {
//     type: UPDATE_NEW_POST_TEXT, 
//     newText: text 
//   }
// }
// export const sendMessageCreator = () => ({
//   type: SEND_MESSAGE
// }); // можно писать в одну строку

// export const updateNewMessageBodyCreator = (body) => {
//   return {
//     type: UPDATE_NEW_MESSAGE_BODY, 
//     body: body 
//   }
// }

export default initialState;



