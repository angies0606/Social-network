import classes from "./Likes.module.scss";
import classNames from "classnames";
import IconButton from "@ui-kit/IconButton/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Likes ({
  likes,
  addLike,
  removeLike,
  isLiked = false,
  authedUserId,
  isProgress
}) {
  const onClick = () => {
    if(isLiked) {
      removeLike()
      .finally(() => {
      })
    }
    else {
      addLike()
      .finally(() => {
      })
    }
  };

  return (
    <>
      <IconButton 
        onClick={onClick}
        disabled={!authedUserId || isProgress}
      >
        <FavoriteIcon className={classNames(classes.Likes__FavouriteIcon, {
          [classes['Likes__FavouriteIcon--liked']]: isLiked
        })}/>
      </IconButton> 
      <div>
        {likes || ''} 
      </div>
    </>
  )
}

export default Likes;