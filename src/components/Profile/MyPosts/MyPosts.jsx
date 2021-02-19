import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostCreator, updateNewPostTextCreator} from "../../redux/Profile-reducer";


const MyPosts = (props) => {
  let postsElements = props.posts.map((post, index) => 
    <Post message={post.message} likesCount={post.likesCount} key={index}/>
  );
  
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

 return (
    <div className={classes.postsBlock}>
      <div>
        <h3>
          Мои записи
        </h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}  />
          {/* <textarea></textarea> */}
        </div>
        <div>
          <button onClick={onAddPost}>Добавить запись</button>
          {/* <button>Добавить запись</button> */}
        </div>
      </div>
   </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
      
  )
}

export default MyPosts;