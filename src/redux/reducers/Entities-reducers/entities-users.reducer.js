import initialState from "@redux/store/initial-state";
import {
  ADD_USERS
} from "@redux/actions/users.actions.js";

function entitiesUsersReducer(state = initialState.entities.users, action) {
  switch (action.type) {
    case ADD_USERS: {
      const newState = {
        ...state
      };
      action.data.forEach(user => {
        newState[user._id] = user;
      });
      return newState;
    }
   
    default:
      return state;
  }
}

export default entitiesUsersReducer;