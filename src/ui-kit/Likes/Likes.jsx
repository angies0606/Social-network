import IconButton from '@ui-kit/IconButton/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useState, useEffect} from 'react';

function Likes ({
  likes,
  userId,
  addLike
}) {
  const [isProgress, setIsProgress] = useState(false);
  // const [isSameUser, setIsSameUser] = useState(false);
  
  // useEffect(() => {
  //   setIsSameUser(false);
  // }, [userId]);

  const onAddLike = () => {
    // if(isSameUser) {
    //   return;
    // }
    // setIsSameUser(true);
    setIsProgress(true);
    addLike(userId)
      .finally(() => {
        setIsProgress(false);
      })
  }

  // TODO: дописать удаление лайков и возможность одному пользователю ставить один лайк
  return (
    <>
      <IconButton onClick={onAddLike}>
        <FavoriteIcon />
      </IconButton> 
      <div>
        {likes.length || ''} 
      </div>
    </>
  )
}

export default Likes;