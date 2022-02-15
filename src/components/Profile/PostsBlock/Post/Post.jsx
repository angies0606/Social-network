
import classes from "./Post.module.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@ui-kit/IconButton/IconButton';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from "@mui/material/CardActions";
import CommentIcon from '@mui/icons-material/Comment';
import Menu from '@ui-kit/Menu/Menu.jsx';
import MenuItem from '@mui/material/MenuItem';
import PostCreator from "../PostCreator/PostCreator";
import { TextField } from "@mui/material";
import {useState, useMemo} from 'react';
import DateBar from "@ui-kit/DateBar/DateBar";
import Likes from "@ui-kit/Likes/Likes.jsx";
import CommentsCreator from "@components/CommentsCreator/CommentsCreator";
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';



const Post = ({
  post,
  deletePost,
  editPost,
  authUserId,
  onAddLike
}) => {
  const [changeMode, setChangeMode] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const textField = useMemo(() => {
    return <TextField 
      // className={classes.PostCreator__TextField}
      // placeholder="Что у Вас нового?"
      fullWidth
      multiline
      rows={4}
    />;
  }, []);
  
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
    setChangeMode(true);
    deletePost(post._id).
      then(() => {
        setChangeMode(false);
      })
  }

  const addLike = (userId) => {
    return onAddLike(post._id, userId);
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      className = {classes.Post__Card}
      sx={{}}
    >
       <CardHeader
        avatar={
          <Avatar 
            src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg"
          >
          </Avatar>
        }
        action={
          <Menu changeMode={changeMode}> 
            <MenuItem onClick={onPostEdit}>Редактировать</MenuItem>
            <MenuItem onClick={onPostDelete}>Удалить</MenuItem>
          </Menu>
        }
        title="Jane Chaus"
        subheader={<DateBar creationDate={post.createdAt}/>}
      />
      <div className={classes.Card__CardMediaBox}>
        <CardMedia
          component="img"
          image={post.image}
          className={classes.Card__CardMedia}
        />
      </div>
      <CardContent>
        {!changeMode &&
          <Typography variant="body1" color="text.secondary">
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
            addLike={addLike}
            likes={post.likes}
            authUserId={authUserId}
          />
        </CardActions>
        <CardActions disableSpacing>
          <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <CommentIcon /> 
          </ExpandMore>
        </CardActions>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <hr />
          <CommentsCreator authUserId={authUserId}/>
        </CardContent>
      </Collapse>
      
    </Card>
  )
}

export default Post;