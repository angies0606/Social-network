
import classes from "./Post.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@ui-kit/Avatar/Avatar";
import IconButton from "@ui-kit/IconButton/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from "@mui/material/CardActions";
import CommentIcon from "@mui/icons-material/Comment";
import Menu from "@ui-kit/Menu/Menu.jsx";
import MenuItem from "@mui/material/MenuItem";
import PostCreator from "../PostCreator/PostCreator";
import { TextField } from "@mui/material";
import {useState, useMemo, useEffect, useCallback} from "react";
import DateBar from "@ui-kit/DateBar/DateBar";
import Likes from "@ui-kit/Likes/Likes.jsx";
import CommentsCreator from "@components/CommentsCreator/CommentsCreator";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Separator from "@ui-kit/Separator/Separator";
import Comment from "@components/Comment/Comment";
import {postsApi, usersApi} from "@api/api-n";
import classNames from "classnames";

const Post = ({
  post,
  deletePost,
  editPost,
  profileUser,
  profileUserId,
  putComments,
  setLike,
  // addLike,
  // removeLike,
  comments,
  deleteComment,
  authedUser,
  isProgress
}) => {
  const [changeMode, setChangeMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isPostReady, setIsPostReady] = useState(false);
  const [isCommentsReady, setCommentsReady] = useState(false);
  
  // Получаем данные о владельце поста и комментов
  // useEffect(() => {
  //   usersApi.getUser
  // }, [post])
  // const startProgress = useCallback(() => {
  //   setIsProgress(true);
  // }, [setIsProgress]);

  // const endProgress = useCallback(() => {
  //   setIsProgress(false);
  // }, [setIsProgress]); 
  

  const textField = useMemo(() => {
    return <TextField 
      // className={classes.PostCreator__TextField}
      // placeholder="Что у Вас нового?"
      fullWidth
      multiline
      rows={4}
    />;
  }, []);

  useEffect(() => {
    if(expanded) {
      onGetComments(post._id);
    }
  }, [expanded])

  if(!post) return null;

  const onAddComment = (commentData) => {
    return postsApi.addComment({
      postId: post._id, 
      ...commentData
    })
      .then(data => {
        putComments(data);
      })
  }

  const onGetComments = (postId) => {
    setCommentsReady(false);
    return postsApi.getComments(postId)
      .then(data => {
        putComments(data);
        setCommentsReady(true);
      })
        // .then(() => {});
  }

  const onDeleteComment = (commentId) => {
    return postsApi.deleteComment(commentId)
      .then(comment => {
        deleteComment(comment);
      })
  }

  const onAddLike = () => {
    return postsApi.addLike(post._id)
      .then(payload => {
        setLike(payload);
      })
  }

  const onRemoveLike = () => {
    return postsApi.removeLike(post._id)
    .then(payload => {
      setLike(payload);
    })
  }
  
  const onConfirmEdit = (postData) => {
    return editPost({
      _id: post._id,
      ...postData
    }).
      then(() => {
        setChangeMode(false);
      })
  }

  const onPostEdit = () => {
    setChangeMode(true);
  }

  const onPostDelete = () => {
    // setChangeMode(true);
    deletePost(post._id).
      then(() => {
        // setChangeMode(false);
      })
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
     
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isShownData = isPostReady && !post;
  
  return (
    <>
      {/* {isShownData &&  */}
        <Card 
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
                <MenuItem onClick={onPostDelete}>Удалить</MenuItem>
              </Menu>
            : null
          }
          title={profileUser.nickname}
          subheader={<DateBar creationDate={post.createdAt}/>}
        />
        <div className={classes.Card__CardMediaBox}>
          <CardMedia
            component="img"
            image={post.image}
            className={classes.Card__CardMedia}
          />
        </div>
        <CardContent className={classes.Post__CardContent} >
          {!changeMode &&
            <Typography variant="body1" className={classes.Post__PostText}>
              {post.text}
            </Typography> 
          }
          {changeMode &&
            <PostCreator
              confirmed={onConfirmEdit}
              postText={post.text}
              cancelChange={() => setChangeMode(false)}
              isShowCancelButton
              buttonContent={'Изменить'}
              textField={textField}
            />
          }
        </CardContent>
        <div className={classes.Card__CardActionsBox}>    
          <CardActions disableSpacing>
            <Likes
              addLike={onAddLike}
              likes={post.nLikes}
              profileUserId={profileUserId}
              isLiked={post.isLiked}
              authedUserId={authedUser._id}
              removeLike={onRemoveLike}
              isProgress={isProgress}
            />
          </CardActions>
          <CardActions disableSpacing>
                <div>
                  {post.nComments || ''} 
                </div> 
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
              
                <CommentIcon className={classNames(classes.Post__CommentIcon, {
                  [classes['Post__CommentIcon--expanded']]: expanded
                })}/> 
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            className={classes.Post_CommentsCreatorBlock}
          >
            {isCommentsReady && comments.map((comment, index) => {
              return (
                <div key={index}>
                  <Separator />
                  <Comment 
                    comment={comment}
                    deleteComment={onDeleteComment}
                    isProgress={isProgress}
                    authedUserId={authedUser._id}
                  />
                </div>
              )} 
            )}
          
            <Separator />
            <CommentsCreator 
              authedUser={authedUser}
              confirmed={onAddComment}
            />
          </CardContent>
        </Collapse>
      </Card>
      {/* } */}
    </>
  )
}

export default Post;