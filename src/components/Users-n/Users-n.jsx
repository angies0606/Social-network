import { useEffect, useState } from "react";
import { usersApi } from "@api/api";
import UserInfo from "./UserInfo/UserInfo";

function Users ({
  addUsers,
  users
}) {
  const [isUsersListReady, setIsUsersListReady] = useState(false);

  useEffect(() => {
    usersApi.getUsers()
      .then(users => {
        setIsUsersListReady(true);
        addUsers(users)
      })
  }, [addUsers]);

  const isShowNoData = users?.length === 0 && isUsersListReady;
  // TODO: проверить что показывается, когда нет пользователей на сервере
  return (
    <>
      {
        isShowNoData ? <div>Список пользователей пуст</div> :
        <div>
          {users.map((user, index) => {
            return <UserInfo 
                      key={index} 
                      userId={user._id}
                      nickname={user.nickname} 
                      avatar={user.avatar} />
          })}
        </div>
      }
    </>
 )
}

export default Users;