
import {
  putPostsActionCreator, 
  deletePostActionCreator, 
  editPostActionCreator,
  addLikeActionCreator
} from "@redux/actions.js";
import PostsBlock from './PostsBlock';
import { connect } from "react-redux";


let mapStateToProps = (state) => {
  return {
    posts: state.pages.userPage.posts.map(postId => state.entities.posts[postId])
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPosts: (posts) => {
      dispatch(putPostsActionCreator(posts));
    },
    deletePost: (postId) => {
      dispatch(deletePostActionCreator(postId));
    },
    editPost: (post) => {
      dispatch(editPostActionCreator(post));
    },
    addLike: (payload) => {
      dispatch(addLikeActionCreator(payload));
    }
  }
}

const PostsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
export default PostsBlockConnected;