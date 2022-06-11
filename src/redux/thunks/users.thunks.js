import { usersApi } from "@api/api";
import { setUserActionCreator } from "@redux/actions/users.actions";

export const getUser = (userId) => (dispatch) => {
  usersApi.getUser(userId)
    .then(response => {
      dispatch(setUserActionCreator(response));
    });
};
