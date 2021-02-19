const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

let initialState = {
  users: [
    {id: 1, followed: false, fullName: "Евгения", status: "Привет! Я новичок!", location: { city: "Нижний Новгород", country: "РФ" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"}, 
    {id: 2, followed: true, fullName: "Лена", status: "Все хорошо", location: { city: "Донецк", country: "ДНР" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"},
    {id: 3, followed: true, fullName: "Ксения", status: "ахахаха", location: { city: "Донецк", country: "ДНР" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"},
  ]
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      };
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, action.users]
      }
    default:
      return state;
  }
}

export const followCreator = (userId) => ({
  type: FOLLOW,
  userId
}); // можно писать в одну строку

export const unfollowCreator = (userId) => {
  return {
    type: UNFOLLOW,
    userId
  }
} ;
export const setUsersCreator = (users) => {
  return {
    type: SET_USERS,
    users
  }
} ;

export default usersReducer;