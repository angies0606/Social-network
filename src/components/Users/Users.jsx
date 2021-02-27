import unknownUserAvatar from "../../assets/images/unnamed.jpg";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [] ;
  for (let i= 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div> 
    <div>
      {pages.map(p => {
        return <span className={props.currentPage === p && classes.selectedPage} onClick={(e) => {props.onPageChanged(p)}}>{p}</span>
      })}
    </div>
    
    { props.users.map(u => <div key={u.id}>  
      <span>
        <div>
          <NavLink to={"/profile/" + u.id}>
            <img src={u.photos.small !=null ? u.photos.small: unknownUserAvatar} className={classes.userPhoto} />
          </NavLink>
        </div>
        <div>
          {u.followed
            ? <button disabled={props.followingInProgress} onClick = {() => {
              props.toggleFollowingInProgress(true, u.id); 
              axios
                  .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, { // y delete запроса 2 параметра 
                    withCredentials: true,
                    headers: {
                      "API-KEY": "70f4bfee-9d8e-4a05-ad99-d34f716a608f"
                    }
                  })
                  .then(response => {
                    if (response.data.resultCode === 0) {
                      props.unfollow(u.id);
                    }
                    props.toggleFollowingInProgress(false, u.id);
                  });
              }}>
                Отписка
              </button>
            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick = {() => {
              props.toggleFollowingInProgress(true, u.id);  
              axios
                  .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                    withCredentials: true,
                    headers: {
                      "API-KEY": "70f4bfee-9d8e-4a05-ad99-d34f716a608f"
                    }
                  }) // y post запроса 3 параметра
                  .then(response => {
                    if(response.data.resultCode === 0) {
                      props.follow(u.id);
                    }
                    props.toggleFollowingInProgress(false, u.id);
                  });
              }}>
                Подписаться
              </button>
          }
        </div>
      </span>
      <span>
        <span>
          <div>{u.name}</div><div>{u.status}</div>
        </span>
        <span>
          {/* <div>{u.location.city}</div><div>{u.location.country}</div> */}
        </span>
      </span>
      <hr/>
    </div>)}
  </div>
}

export default Users;
