
import classes from "./Post.module.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@ui-kit/IconButton/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from "@mui/material/CardActions";
import CommentIcon from '@mui/icons-material/Comment';
import Button from "ui-kit/Button/Button";
import MuiButton from '@mui/material/Button';
import Menu from '@ui-kit/Menu/Menu.jsx';
import MenuItem from '@mui/material/MenuItem';


const Post = ({
  post,
  deletePost,
  editPost
}) => {
  const menuContent = ['Изменить', 'Удалить'];
  const onPostChange = () => {

  }
  const onPostDelete = () => {
    deletePost(post._id);
  }
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
          <Menu> 
            <MenuItem onClick={onPostChange}>Изменить</MenuItem>
            <MenuItem onClick={onPostDelete}>Удалить</MenuItem>
          </Menu>
        }
        title="Jane Chaus"
        subheader="15 января 2022 20:16"
      />
      <div className={classes.Card__CardMediaBox}>
        <CardMedia
          component="img"
          image={post.image}
          className={classes.Card__CardMedia}
        />
      </div>
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      <div className={classes.Card__CardActionsBox}>    
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon /> 
          </IconButton>
          <div>
           {post.likes} 
          </div>
        </CardActions>
        <CardActions disableSpacing>
          <IconButton>
            <CommentIcon /> 
          </IconButton>
        </CardActions>
      </div>
    </Card>
  )
  
  // return (
  //   <div>
  //     <div className={classes.item}>
  //         <img src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg"/>
  //         {props.message}
  //       </div>
  //       <div>
  //         <span>Понравилось:</span> {props.likesCount}
  //       </div>
  //     </div>
  // )
}

export default Post;