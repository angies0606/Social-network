import { usersApi } from "@api/api-n";
import { setUserActionCreator } from "@redux/actions/user.actions";

export const getUser = (userId) => (dispatch) => {
  usersApi.getUser(userId)
    .then(response => {
      dispatch(setUserActionCreator(response));
    });
}
