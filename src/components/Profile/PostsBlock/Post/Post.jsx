
import classes from "./Post.module.css";
import classNames from "classnames";
import { useState, useMemo, useEffect, useCallback } from "react";
import { postsApi, imagesApi } from "@api/api";
import PostCreator from "../PostCreator/PostCreator";
import CommentsCreator from "@components/CommentsCreator/CommentsCreator";
import Likes from "@ui-kit/Likes/Likes.jsx";
import Comment from "@components/Comment/Comment";
import DateBar from "@ui-kit/DateBar/DateBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@ui-kit/Avatar/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CommentIcon from "@mui/icons-material/Comment";
import Menu from "@ui-kit/Menu/Menu.jsx";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import ImageDialog from "@ui-kit/ImageDialog/ImageDialog";
import Dialog from "@ui-kit/Dialog/Dialog";
import ImageUrlPreview from "@ui-kit/ImagePreview/ImageUrlPreview";
import Collapse from "@mui/material/Collapse";
import Expander from "@features/Expander/Expander";
import Separator from "@ui-kit/Separator/Separator";

const imageDialogTitles = {
  add: 'Вы хотите добавить изображение?',
  change: 'Вы хотите изменить изображение?'
};

const Post = ({
  post,
  deletePost,
  editPost,
  profileUser,
  profileUserId,
  putComments,
  setLike,
  comments,
  deleteComment,
  authedUser,
  isProgress
}) => {
  const [changeMode, setChangeMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const [isPostReady, setIsPostReady] = useState(false);
  const [isCommentsReady, setCommentsReady] = useState(false);
  const [isImageInPost, setIsImageInPost] = useState(false);
  const [editingImageUrl, setEditingImageUrl] = useState(null);
  const [editingImageFile, setEditingImageFile] = useState(null); 
  const [imageNeedsDeleting, setImageNeedsDeleting] = useState(null);
  const [wasPostImageChanged, setWasPostImageChanged] = useState(false);
  const [imageDialogTitle, setImageDialogTitle] = useState(null);
  const [isImageDialogOpened, setIsImageDialogOpened] = useState(false);
  const [isMessageDialogOpened, setIsMessageDialogOpened] = useState(false);

  useEffect(() => {
    if(isImageInPost) {
      setImageDialogTitle(imageDialogTitles.change);
    } else {
      setImageDialogTitle(imageDialogTitles.add);
    }
  }, [isImageInPost])

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
  
  const onPostEdit = () => {
    setChangeMode(true);
    if(post.image) {
      setIsImageInPost(true);
      setEditingImageUrl(post.image);
    }
  };

  const onConfirmEdit = (postData) => {
    let editedPost = {
      ...postData,
      _id: post._id,
    };

    return Promise.resolve((post.image !== editingImageUrl) && !imageNeedsDeleting && editingImageUrl
            ? uploadImage()
                .then(imageUrl => {
                  editedPost.image = imageUrl
                })
            : (post.image !== editingImageUrl) && imageNeedsDeleting && post.image && !editingImageUrl
            ? deletePostImage()
                .then(newPost => {
                  editedPost = {
                    ...newPost
                  }
                })
            : (post.image !== editingImageUrl) && imageNeedsDeleting && post.image && editingImageUrl
            ? deletePostImage()
                .then(() => {
                  return uploadImage()
                    .then(imageUrl => {
                      editedPost.image = imageUrl
                    })
                })
            : null
            ).then(() => {
              return editPost(editedPost)
                .then(() => {
                  setEditingImageUrl(null);
                  setEditingImageFile(null);
                  setImageNeedsDeleting(null);
                  setWasPostImageChanged(false);
                  setIsImageInPost(false);
                  setChangeMode(false);
                })
            })
  };

  const onPostDeleteConfirm = () => {
    deletePost(post._id).
      then(() => {
        setIsMessageDialogOpened(false);
      })
  };

  const onGetComments = (postId) => {
    setCommentsReady(false);
    return postsApi.getComments(postId)
      .then(data => {
        putComments(data);
        setCommentsReady(true);
      })
  };

  const onAddComment = (commentData) => {
    return postsApi.addComment({
      postId: post._id, 
      ...commentData
    })
      .then(data => {
        putComments(data);
      })
  };

  const onDeleteComment = (commentId) => {
    return postsApi.deleteComment(commentId)
      .then(comment => {
        deleteComment(comment);
      })
  };

  const onAddLike = () => {
    return postsApi.addLike(post._id)
      .then(payload => {
        setLike(payload);
      })
  };

  const onRemoveLike = () => {
    return postsApi.removeLike(post._id)
    .then(payload => {
      setLike(payload);
    })
  };
  
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('img', editingImageFile);
    return imagesApi.addImage(formData)
      .then(response => {
        return response.imageUrl
      })
  };

  const onPostImageChange = (image) => {
    const imageUrl = window.URL.createObjectURL(image);
    setEditingImageFile(image);
    setEditingImageUrl(imageUrl);
    setIsImageInPost(true); 
    setWasPostImageChanged(true);
    return Promise.resolve();
  };

  const deletePostImage = () => {
    return postsApi.deleteImage(post._id)
      .then(newPost => {
        return newPost;
      })
  };
  
  const onDeleteImage = () => {
    if(editingImageUrl === post.image) {
      setImageNeedsDeleting(editingImageUrl);
    }
    setWasPostImageChanged(true);
    setIsImageInPost(false);
    setEditingImageFile(null);
    setEditingImageUrl(null);
  };

  const onImageDialogOpen = () => {
    setIsImageDialogOpened(true);
  };

  const onCloseImageDialog = () => {
    setIsImageDialogOpened(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
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
                <MenuItem onClick={() => (setIsMessageDialogOpened(true))}>Удалить</MenuItem>
              </Menu>
            : null
          }
          title={profileUser.nickname}
          subheader={<DateBar creationDate={post.createdAt} updateDate={post.updatedAt}/>}
        />
          
          {changeMode && isImageInPost ? 
              <ImageUrlPreview
                imageUrl={editingImageUrl}
                deleteImage={onDeleteImage}
                className={classes.Card__CardMediaBox}
                isDeleteShown={true}
                isPostImage={true}
              />: null
          }
          
          {!changeMode && post.image ?
            <div className={classes.Card__CardMediaBox}>
              <CardMedia
                component='img'
                image={post.image}
                className={classes.Card__CardMedia}
              />
            </div> : null
          }
         
        <CardContent className={classes.Post__CardContent} >
          {!changeMode &&
            <Typography variant='body1' className={classes.Post__PostText}>
              {post.text}
            </Typography> 
          }
          {changeMode &&
            <PostCreator
              onPostConfirm={onConfirmEdit}
              postText={post.text}
              cancelChange={() => setChangeMode(false)}
              isShowCancelButton
              buttonContent={'Изменить'}
              textField={textField}
              openImageDialog={onImageDialogOpen}
              wasPostImageChanged={wasPostImageChanged}
              post={post}
            />
          }
        </CardContent>
        <div className={classes.Card__CardActionsBox}>    
          <CardActions disableSpacing>
            <Likes
              addLike={onAddLike}
              likes={post.nLikes}
              // profileUserId={profileUserId}
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
            <Expander
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <CommentIcon className={classNames(classes.Post__CommentIcon, {
                [classes['Post__CommentIcon--expanded']]: expanded
              })}/> 
            </Expander>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent
            className={classes.Post_CommentsCreatorBlock}
          >
            {isCommentsReady && comments?.map((comment, index) => {
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
              isProgress={isProgress}
            />
          </CardContent>
        </Collapse>
      </Card>
      <ImageDialog 
        isShown={isImageDialogOpened}
        title={imageDialogTitle}
        closeDialog={onCloseImageDialog}
        isProgress={isProgress}
        onImageConfirm={onPostImageChange}
      />
      <Dialog
        isShown={isMessageDialogOpened}
        title={'Удаление поста'}
        message={'Вы действительно хотите удалить этот пост?'}
        isProgress={isProgress}
        onCancel={() => {setIsMessageDialogOpened(false)}}
        onConfirm={onPostDeleteConfirm}
      />
    </>
  )
}

export default Post;