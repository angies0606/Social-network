import classes from "./Comment.module.css";
import {useState} from "react";
import Avatar from "@ui-kit/Avatar/Avatar";
import { Typography } from "@mui/material";
import DateBar from "@ui-kit/DateBar/DateBar";
import IconButton from "@ui-kit/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@ui-kit/Dialog/Dialog";

function Comment ({
  comment,
  deleteComment,
  authedUserId,
  isProgress
}) {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const onDeleteComment = () => {
    if(authedUserId === comment.user) {
      deleteComment(comment._id)
      .finally(() => {
        setIsDialogOpened(false);
      });
    } else return;
  };
  
  return (
    <>
      <div className={classes.Comment_Box}>
        {authedUserId === comment.user ? 
          <IconButton 
            className={classes.Comment_Icon}
            onClick={() => setIsDialogOpened(true)}
          >
            <CloseIcon 
              sx={{ width: 15, height: 15, padding: 0 }} 
              className={classes.Comment_CloseIcon}
            />
          </IconButton>
          : null
        }
        
        <div>
          {comment.userNickname}
        </div>
        <div className={classes.Comment_UserCommentBox}>
          <Avatar
            className={classes.Comment_Avatar}
            userAvatar={comment.userAvatar}
            avatarHeight={30}
            avatarWidth={30}
          />
          <Typography className={classes.Comment_Typography}>
            {comment.text}
          </Typography>
        </div>
        <DateBar
          creationDate={comment.createdAt}
          className={classes.Comment_DateBar}
          updateDate={comment.updatedAt}
        />
      </div>
      <Dialog
        isShown={isDialogOpened}
        title={"Удаление комментария"}
        message={"Вы действительно хотите удалить этот комментарий?"}
        isProgress={isProgress}
        onCancel={() => {setIsDialogOpened(false)}}
        onConfirm={onDeleteComment}
      />
    </>
  )
}

export default Comment;