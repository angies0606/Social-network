import {useState, useEffect} from "react";
import IconButton from "@ui-kit/IconButton/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames";
import classes from "./Likes.module.scss";

function Likes ({
  likes,
  profileUserId,
  addLike,
  removeLike,
  isLiked = false,
  authedUserId,
  isProgress
}) {
 
  // useEffect(() => {
  //   setIsSameUser(false);
  // }, [userId]);

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
    
  }

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