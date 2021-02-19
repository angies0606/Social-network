
import classes from "./Post.module.css";
const Post = (props) => {
  return (
    <div>
      <div className={classes.item}>
          <img src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg"/>
          {props.message}
        </div>
        <div>
          <span>Понравилось:</span> {props.likesCount}
        </div>
      </div>
  )
}

export default Post;