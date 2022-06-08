
import {
  addPostActionCreator, 
  deletePostActionCreator, 
  editPostActionCreator,
  putCommentsActionCreator,
  setPostsActionCreator
} from "@redux/actions/post.actions";
import PostsBlock from './PostsBlock';
import { connect } from "react-redux";


let mapStateToProps = (state) => {
  return {
    posts: state.pages.userPage.posts.map(postId => state.entities.posts[postId]),
    comments: state.entities.comments
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPostActionCreator(post));
    },
    setPosts: (posts) => {
      dispatch(setPostsActionCreator(posts));
    },
    deletePost: (postId) => {
      dispatch(deletePostActionCreator(postId));
    },
    editPost: (post) => {
      dispatch(editPostActionCreator(post));
    },
    putComments: (comments) => {
      dispatch(putCommentsActionCreator(comments));
    }
  }
}

const PostsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
export default PostsBlockConnected;