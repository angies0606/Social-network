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
      <div className={classes.Comment__Box}>
        {/* {authedUserId === comment.user ? 
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
        } */}
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
          subheader={ <DateBar
              creationDate={comment.createdAt}
              className={classes.Comment__DateBar}
              updateDate={comment.updatedAt}
            />}
        ></CardHeader>
         <Typography className={classes.Comment__Typography}>
            <div className={classes.Comment__Text}>
              {comment.text}
            </div>
          </Typography>
        {/* // <div>
        //   {comment.userNickname}
        // </div>
        // <div className={classes.Comment_UserCommentBox}>
        //   <Avatar
        //     className={classes.Comment_Avatar}
        //     userAvatar={comment.userAvatar}
        //     avatarHeight={30}
        //     avatarWidth={30}
        //   />
        //   <Typography className={classes.Comment_Typography}>
        //     {comment.text}
        //   </Typography>
        // </div>
        // <DateBar
        //   creationDate={comment.createdAt}
        //   className={classes.Comment_DateBar}
        //   updateDate={comment.updatedAt}
        // /> */}
       </div>
      <ConfirmDialog
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

{/* <Card 
className = {classes.Post__Card}
sx={{}}
>
<CardHeader
  avatar={
    <Avatar 
      userAvatar={profileUser.avatar}
      // avatarHeight={} 
      // avatarWidth={}
    />
  }
  action={
    post.user === authedUser._id ? 
      <Menu changeMode={changeMode}> 
        <MenuItem onClick={onPostEdit}>Редактировать</MenuItem>
        <MenuItem onClick={() => (setIsMessageDialogOpened(true))}>Удалить</MenuItem>
      </Menu>
    : null
  }
  title={profileUser.nickname}
  subheader={<DateBar creationDate={post.createdAt} updateDate={post.updatedAt}/>}
/> */}