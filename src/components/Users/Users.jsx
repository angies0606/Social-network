import classes from "./Users.module.css";
let Users = (props) =>
{
  return (
    <div>
      {
      props.users.map(u => <div key={u.id}>  
        <span>
          <div>
            <img src={u.photoUrl} className={classes.userPhoto} />
          </div>
          <div>
            <button>
              Подписаться
            </button>
          </div>
        </span>
        <span>
          <span>
            <div>{u.fullName}</div><div>{u.status}</div>
          </span>
          <span>
            <div>{u.location.city}</div><div>{u.location.country}</div>
          </span>
        </span>
      </div>)
      }
    </div>
  )
}

export default Users;