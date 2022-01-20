import React from 'react';
import classes from "./PostsBlock.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required} from "../../../utils/validators/validators"
import { Textarea } from '../../common/FormsControls/FormsControls';


const PostsBlock = (props) => {
  let postsElements = props.posts.map((post, index) => 
    <Post 
      post={post}
      key={index}
    />
  );
  

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

 return (
    <div className={classes.PostsBlock}>
      <div className={classes.PostsBlock__Header}>
        <h3>
          Мои записи
        </h3>
      </div>
      {/* <AddNewPostFormRedux onSubmit={onAddPost} /> */}
      <div className={classes.PostsBlock_Posts}>
        {postsElements}
      </div>
    </div>
      
  )
}

const maxLength10 = maxLengthCreator(10);
const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component={Textarea}
        validate={[required, maxLength10]} placeholder={"Добавить сообщение"}/>
      </div>
      <div>
        <button>Добавить запись</button>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm"
})(AddNewPostForm);

export default PostsBlock;