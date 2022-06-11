import initialState from "@redux/store/initial-state";
import {
  ADD_USERS
} from "@redux/actions/users.actions";

function usersPageReducer(state = initialState.pages.usersPage, action) {
  switch (action.type) {
    case ADD_USERS: {
      return {
        ...state,
       users: [
          ...state.users,
          ...action.data.map(user => user._id).filter(userId => !state.users.includes(userId))
        ]
      }
    }
    
    default:
      return state;
  }
}

export default usersPageReducer;