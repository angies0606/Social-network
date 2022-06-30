import { connect } from "react-redux";
import {
  setLikeActionCreator,
  putCommentsActionCreator,
  deleteCommentActionCreator,
} from "@redux/actions/post.actions";
import Post from "./Post";

let mapStateToProps = (state, ownProps) => {
  const {post: {_id: postId}} = ownProps;
  return {
    comments: state.entities.posts[postId].comments?.map(commentId => {
      return state.entities.comments[commentId];
    })
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    setLike: (data) => {
      dispatch(setLikeActionCreator(data));
    },
    putComments: (data) => {
      dispatch(putCommentsActionCreator(data));
    },
    deleteComment: (comment) => {
      dispatch(deleteCommentActionCreator(comment));
    }
  }
};

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);
export default PostConnected;