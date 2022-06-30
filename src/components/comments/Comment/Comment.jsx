import classes from "./Comment.module.scss";
import { useState } from "react";
import Avatar from "@ui-kit/Avatar/Avatar";
import { CardHeader, Typography } from "@mui/material";
import DateBar from "@ui-kit/DateBar/DateBar";
import IconButton from "@ui-kit/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmDialog from "@ui-kit/ConfirmDialog/ConfirmDialog";

function Comment ({
  comment,
  deleteComment,
  authedUserId
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
      <div className={classes.Comment__Box}>
        <CardHeader
          className={classes.Comment__Header}
          avatar={
            <Avatar
              className={classes.Comment__Avatar}
              userAvatar={comment.userAvatar}
              avatarHeight={30}
              avatarWidth={30}
            />
          }
          action= {
            authedUserId === comment.user ? 
              <IconButton 
                className={classes.Comment__Icon}
                onClick={() => setIsDialogOpened(true)}
              >
                <CloseIcon 
                  sx={{ width: 15, height: 15, padding: 0 }} 
                  className={classes.Comment__CloseIcon}
                />
              </IconButton>
              : null
          }
          title={comment.userNickname}
          subheader={ 
            <DateBar
              creationDate={comment.createdAt}
              className={classes.Comment__DateBar}
              updateDate={comment.updatedAt}
            />
          }
        />
         <Typography className={classes.Comment__Typography}>
            <div className={classes.Comment__Text}>
              {comment.text}
            </div>
          </Typography>
      </div>
      <ConfirmDialog
        isShown={isDialogOpened}
        title={"Удаление комментария"}
        message={"Вы действительно хотите удалить этот комментарий?"}
        onCancel={() => {setIsDialogOpened(false)}}
        onConfirm={onDeleteComment}
      />
    </>
  )
}

export default Comment;