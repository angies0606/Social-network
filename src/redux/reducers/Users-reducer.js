import { usersAPI } from "@api/api";
import initialState from "@redux/store/initial-state";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTSAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

// let initialstate = {
//   users: [],
//   pageSize: 5,
//   totalUsersCount: 0,
//   currentPage: 1,
//   isFetching: false,
//   followingInProgress: []

//   //  [ {id: 1, followed: false, fullName: "Евгения", status: "Привет! Я новичок!", location: { city: "Нижний Новгород", country: "РФ" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"}, 
//   //    {id: 2, followed: true, fullName: "Лена", status: "Все хорошо", location: { city: "Донецк", country: "ДНР" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"},
//   //    {id: 3, followed: true, fullName: "Ксения", status: "ахахаха", location: { city: "Донецк", country: "ДНР" }, photoUrl:"https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"},
//   //    ]
// };

const usersReducer = (state = initialState.usersPage, action) => {
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
        users: action.users
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
      case SET_TOTAL_USERS_COUNT:
        return {
          ...state,
          totalUsersCount: action.count
        };
      case TOGGLE_IS_FETCHING:
        return {
          ...state,
          isFetching: action.isFetching
        };
      case TOGGLE_IS_FOLLOWING_PROGRESS:
        return {
          ...state,
          followingInProgress: action.isFetching 
          ? [...state.followingInProgress, action.userId] 
          : state.followingInProgress.filter(id => id !== action.userId)
        };
    default:
      return state;
  }
}

// action- криейторы
export const followSucces = (userId) => ({
  type: FOLLOW,
  userId
}); // можно писать в одну строку

export const unfollowSuccess= (userId) => {
  return {
    type: UNFOLLOW,
    userId
  }
};
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
};
export const setCurrentPage = (currentPage) => {
  return {
    type:  SET_CURRENT_PAGE,
    currentPage
  }
}
export const setTotalUsersCount = (totalUsersCount) => {
  return {
    type:  SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  }
}
export const toggleIsFetching = (isFetching) => {
  return {
    type:  TOGGLE_IS_FETCHING,
    isFetching
  }
}
export const toggleFollowingInProgress = (isFetching, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
  }
}
export const getUsers = (page, pageSize) => {
  return (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));
  usersAPI.getUsers(page, pageSize)
    .then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
  });
}
}
export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
              usersAPI.follow(userId) // y post запроса 3 параметра
                .then(response => {
                  if(response.data.resultCode === 0) {
                    dispatch(followSucces(userId));
                  }
                  dispatch(toggleFollowingInProgress(false, userId));
                });
  }
}
export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
              usersAPI.unfollow(userId)
                .then(response => {
                  if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                  }
                  dispatch(toggleFollowingInProgress(false, userId));
                });
  }
}
export default usersReducer;