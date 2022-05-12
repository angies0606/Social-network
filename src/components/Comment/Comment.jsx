import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DateBar from '@ui-kit/DateBar/DateBar';
import IconButton from '@ui-kit/IconButton/IconButton';
import classes from './Comment.module.css';
import CloseIcon from '@mui/icons-material/Close';
import {useCallback, useState} from 'react';


function Comment ({
  comment,
  deleteComment
}) {
  const [isProgress, setIsProgress] = useState(false);

  const startProgress = useCallback(() => {
    setIsProgress(true);
  }, [setIsProgress]);

  const endProgress = useCallback(() => {
    setIsProgress(false);
  }, [setIsProgress]);

  const onDeleteComment = () => {
    startProgress();
    deleteComment(comment._id)
      .finally(() => endProgress());
  }
  
  return (
  <div className={classes.Comment_Box}>
    <IconButton 
      className={classes.Comment_Icon}
      onClick={onDeleteComment}
    >
      <CloseIcon 
        sx={{ width: 15, height: 15, padding: 0 }} 
        className={classes.Comment_CloseIcon}
      />
    </IconButton>
    <div className={classes.Comment_UserCommentBox}>
      <Avatar
        className={classes.Comment_Avatar}
        src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg" // TODO: аватар юзера, который оставил коммент
        sx={{ width: 30, height: 30 }}
      />
      <Typography className={classes.Comment_Typography}>
        {comment.text}
      </Typography>
    </div>
    <DateBar
      creationDate={comment.createdAt}
      className={classes.Comment_DateBar}
    />
  </div>
  )
}

export default Comment;