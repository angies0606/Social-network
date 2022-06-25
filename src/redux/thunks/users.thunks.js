import { usersApi } from "@api/api";
import { setUserActionCreator } from "@redux/actions/users.actions";

export const getUserActionCreator = (userId) => (dispatch) => {
  dispatch(setUserActionCreator(null));
  usersApi.getUser(userId)
    .then(response => {
      dispatch(setUserActionCreator(response));
    });
};
