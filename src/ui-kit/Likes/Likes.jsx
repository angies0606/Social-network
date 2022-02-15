import IconButton from '@ui-kit/IconButton/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useState, useEffect} from 'react';

function Likes ({
  likes,
  authUserId,
  addLike
}) {
  const [isProgress, setIsProgress] = useState(false);
  // const [isSameUser, setIsSameUser] = useState(false);
  
  // useEffect(() => {
  //   setIsSameUser(false);
  // }, [authUserId]);

  const onAddLike = () => {
    // if(isSameUser) {
    //   return;
    // }
    // setIsSameUser(true);
    setIsProgress(true);
    addLike(authUserId)
      .finally(() => {
        setIsProgress(false);
      })
  }
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