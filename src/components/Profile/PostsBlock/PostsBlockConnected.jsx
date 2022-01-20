import React from 'react';
import {putPostsActionCreator} from "@redux/reducers/Posts-reducers/actions.js";
import PostsBlock from './PostsBlock';
import { connect } from "react-redux";


let mapStateToProps = (state) => {
  const postsData = state.profilePage.postsData;
  return {
    posts: postsData.posts.map(postId => postsData.entities.posts[postId])
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(putPostsActionCreator(post))
    }
  }
}

const PostsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
export default PostsBlockConnected;