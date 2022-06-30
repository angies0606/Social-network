import { connect } from "react-redux";
import {
  putCommentsActionCreator,
  deleteCommentActionCreator,
} from "@redux/actions/post.actions";
import CommentsBlock from "./CommentsBlock";

let mapStateToProps = (state, ownProps) => {
  const {postId} = ownProps;
  return {
    comments: state.entities.posts[postId].comments?.map(commentId => {
      return state.entities.comments[commentId];
    })
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    putComments: (data) => {
      dispatch(putCommentsActionCreator(data));
    },
    deleteComment: (comment) => {
      dispatch(deleteCommentActionCreator(comment));
    }
  }
};

const CommentsBlockConnected = connect(mapStateToProps, mapDispatchToProps)(CommentsBlock);
export default CommentsBlockConnected;