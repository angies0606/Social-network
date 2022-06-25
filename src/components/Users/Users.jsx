import classes from "./Users.module.css";
import { useEffect, useState, useCallback } from "react";
import { usersApi } from "@api/api";
import UserInfo from "./UserInfo/UserInfo";
import {useScrollContext} from "@features/scroll/scroll.context";
import List from "@ui-kit/List/List";
import { Card, CardContent } from "@mui/material";

const pageSize = 10;

function Users ({
  addUsers,
  users
}) {
  const [isHasMore, setIsHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollableTargetId = useScrollContext();
  const [isUsersListReady, setIsUsersListReady] = useState(false);

  const loadNextPage = useCallback(() => {

    usersApi.getUsers({page, limit: pageSize})
          .then(response => {
            setIsUsersListReady(true);
            addUsers(response.items)
            setIsHasMore(response.hasNextPage);
            setPage(page + 1);
          })
  }, [addUsers, page]);

  useEffect(() => {
    setPage(1);
    loadNextPage();
  }, []);

  const isShowNoData = users?.length === 0 && isUsersListReady;
  // TODO: проверить что показывается, когда нет пользователей на сервере
  return (
    // <div className={classes.Users__Container}>
      <>
        {/* { */}
          {/* // isShowNoData ? <div>Список пользователей пуст</div> : */}
          <div className={classes.Users__Container}>
            <List
              items={users}
              nextMethod={loadNextPage}
              isHasMore={isHasMore}
              scrollableTargetId={scrollableTargetId}
              itemBuilder={user => (
                <UserInfo 
                  key={user._id} 
                  userId={user._id}
                  nickname={user.nickname} 
                  avatar={user.avatar} 
                />
              )}
              noData={
                <Card className={classes.Users__NoDataCard}>
                  <CardContent className={classes.Users__NoDataText}>
                    Нет пользователей
                  </CardContent>
                </Card>
              }
            />
            
            {/* {users.map((user, index) => {
              return <UserInfo 
                        key={index} 
                        userId={user._id}
                        nickname={user.nickname} 
                        avatar={user.avatar} />
            })} */}
          </div>
        {/* } */}
      </>
    // </div>
 )
}

export default Users;