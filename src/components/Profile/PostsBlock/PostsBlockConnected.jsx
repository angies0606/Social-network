
import {
  putPostsActionCreator, 
  deletePostActionCreator, 
  editPostActionCreator,
  addLikeActionCreator,
  putCommentsActionCreator
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
    addPosts: (posts) => {
      dispatch(putPostsActionCreator(posts));
    },
    deletePost: (postId) => {
      dispatch(deletePostActionCreator(postId));
    },
    editPost: (post) => {
      dispatch(editPostActionCreator(post));
    },
    addLike: (like) => {
      dispatch(addLikeActionCreator(like));
    },
    putComments: (comments) => {
      dispatch(putCommentsActionCreator(comments));
    }
  }
}

const PostsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
export default PostsBlockConnected;