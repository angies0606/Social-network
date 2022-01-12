import unknownUserAvatar from "../../assets/images/unnamed.jpg";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";


let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [] ;
  for (let i= 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div> 
    <div>
      {pages.map((p, index) => {
        return <span
          key={index}
          className={props.currentPage === p ? classes.selectedPage : ''}
          onClick={e => props.onPageChanged(p)}
        >
          {p}
        </span>
      })}
    </div>
    
    {props.users.map(u => <div key={u.id}>  
      <span>
        <div>
          <NavLink to={"/profile/" + u.id}>
            <img
              src={u.photos.small != null ? u.photos.small : unknownUserAvatar}
              className={classes.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {u.followed
            ? <button disabled={props.followingInProgress
                .some(id => id === u.id)} 
                  onClick = {() => {
                    props.unfollow(u.id)
                  }}>
                Отписка
              </button>
            : <button disabled={props.followingInProgress
              .some(id => id === u.id)} 
                onClick = {() => {
                  props.follow(u.id)
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
