import classes from "./Likes.module.scss";
import classNames from "classnames";
import IconButton from "@ui-kit/IconButton/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useProgress } from "@features/progress/useProgress.js";

function Likes ({
  likes,
  addLike,
  removeLike,
  isLiked = false,
  authedUserId
}) {
  const {increment, decrement, isProgress} = useProgress();

  const onClick = () => {
    increment();
    if(isLiked) {
      removeLike()
      .finally(() => {
        decrement();
      })
    }
    else {
      addLike()
      .finally(() => {
        decrement();
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