
import classes from "./Post.module.scss";
import classNames from "classnames";
import { useState, useMemo, useEffect } from "react";
import { postsApi, imagesApi } from "@api/api";
import PostCreator from "../PostCreator/PostCreator";
import Likes from "@components/Likes/Likes.jsx";
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
import ConfirmDialog from "@ui-kit/ConfirmDialog/ConfirmDialog";
import ImageUrlPreview from "@ui-kit/ImageUrlPreview/ImageUrlPreview";
import Collapse from "@mui/material/Collapse";
import Expander from "@features/Expander/Expander";
import CommentsBlockConnected from "@components/comments/CommentsBlock/CommentsBlockConnected";

const imageDialogTitles = {
  add: 'Вы хотите добавить изображение?',
  change: 'Вы хотите изменить изображение?'
};

const Post = ({
  post,
  deletePost,
  editPost,
  profileUser,
  setLike,
  authedUser
}) => {
  const [expanded, setExpanded] = useState(false);

  const [changeMode, setChangeMode] = useState(false);
  const [wasImageInPost, setWasImageInPost] = useState(false);
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
      fullWidth
      color='success'
      multiline
      rows={4}
    />;
  }, []);

  if(!post) return null;
  
  const onPostEdit = () => {
    setChangeMode(true);
    if(post.image) {
      setWasImageInPost(true);
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
            ? uploadImageRequest()
            : (post.image !== editingImageUrl) && imageNeedsDeleting && post.image && !editingImageUrl
            ? deletePostImageRequest()
            : (post.image !== editingImageUrl) && imageNeedsDeleting && post.image && editingImageUrl
            ? deletePostImageRequest()
                .then(() => {
                  return uploadImageRequest();
                })
            : getImageRequest()
            ).then(imageUrl => {
              editedPost.image = imageUrl
              return editPost(editedPost)
                .then(() => {
                  setEditingImageUrl(null);
                  setEditingImageFile(null);
                  setImageNeedsDeleting(null);
                  setWasPostImageChanged(false);
                  setWasImageInPost(false);
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
  
  const onPostImageChange = (image) => {
    const imageUrl = window.URL.createObjectURL(image);
    setEditingImageFile(image);
    setEditingImageUrl(imageUrl);
    setIsImageInPost(true); 
    setWasPostImageChanged(true);
    return Promise.resolve();
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

  const uploadImageRequest = () => {
    const formData = new FormData();
    formData.append('img', editingImageFile);
    return imagesApi.addImage(formData)
      .then(response => {
        return response.imageUrl
      })
  };

  const getImageRequest = () => {
    return postsApi.getImage(post._id)
    .then(response => {
      return response.imageUrl
    })
  };

  const deletePostImageRequest = () => {
    return postsApi.deleteImage(post._id)
      .then(() => {
        return '';
      })
  };


  const onCancelEdit = () => {
    setEditingImageUrl(null);
    setEditingImageFile(null);
    setImageNeedsDeleting(null);
    setWasPostImageChanged(false);
    setWasImageInPost(false);
    setIsImageInPost(false);
    setChangeMode(false);
  }

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
                onDeleteImage={onDeleteImage}
                className={classes.Card__CardMediaBox}
                isDeleteShown={true}
                imageClassName={classes.Card__PostImage}
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
         
        <CardContent className={classes.Post__CardContent}>
          {!changeMode &&
            <Typography variant='body1' className={classes.Post__PostText}>
              {post.text}
            </Typography> 
          }
          {changeMode &&
            <PostCreator
              onPostConfirm={onConfirmEdit}
              postText={post.text}
              cancelChange={onCancelEdit}
              isShowCancelButton={true}
              buttonContent={'Изменить'}
              textField={textField}
              openImageDialog={onImageDialogOpen}
              isImageInPost={isImageInPost}
              wasPostImageChanged={wasPostImageChanged}
              wasImageInPost={wasImageInPost}
              post={post}
            />
          }
        </CardContent>
        <div className={classes.Card__CardActionsBox}>    
          <CardActions disableSpacing>
            <Likes
              addLike={onAddLike}
              likes={post.nLikes}
              isLiked={post.isLiked}
              authedUserId={authedUser._id}
              removeLike={onRemoveLike}
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
          <CommentsBlockConnected 
            postId={post._id}
            expanded={expanded}
          />
        </Collapse>
      </Card>
      <ImageDialog 
        isShown={isImageDialogOpened}
        title={imageDialogTitle}
        closeDialog={onCloseImageDialog}
        onImageConfirm={onPostImageChange}
      />
      <ConfirmDialog
        isShown={isMessageDialogOpened}
        title={'Удаление поста'}
        message={'Вы действительно хотите удалить этот пост?'}
        onCancel={() => {setIsMessageDialogOpened(false)}}
        onConfirm={onPostDeleteConfirm}
      />
    </>
  )
}

export default Post;