import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../redux/Profile-reducer";
import MyPosts from './MyPosts';
import { connect } from "react-redux";


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextCreator(text);
       dispatch(action);
    },
    addPost: () => {
      dispatch(addPostCreator())
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;