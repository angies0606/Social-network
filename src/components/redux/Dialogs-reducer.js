const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE: 
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 7, text: body}]
      };
    default:
      return state;
  }
}

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody
}); // можно писать в одну строку

export default dialogsReducer;