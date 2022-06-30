
import {
  newPostActionCreator, 
  deletePostActionCreator, 
  editPostActionCreator,
  setPostsActionCreator,
  addPostsActionCreator
} from "@redux/actions/post.actions";
import PostsBlock from './PostsBlock';
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    posts: state.pages.userPage.posts.map(postId => state.entities.posts[postId]),
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => {
      dispatch(newPostActionCreator(post));
    },
    addPosts: (posts) => {
      dispatch(addPostsActionCreator(posts));
    },
    setPosts: (posts) => {
      dispatch(setPostsActionCreator(posts));
    },
    deletePost: (postId) => {
      dispatch(deletePostActionCreator(postId));
    },
    editPost: (post) => {
      dispatch(editPostActionCreator(post));
    }
  }
};

const PostsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
export default PostsBlockConnected;