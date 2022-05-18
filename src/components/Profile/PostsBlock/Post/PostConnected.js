import { connect } from "react-redux";
import {
  addLikeActionCreator,
  putCommentsActionCreator,
  deleteCommentActionCreator
} from "@redux/actions/post.actions";
import Post from "./Post";


let mapStateToProps = (state, ownProps) => {
  if(!ownProps.post) return null;
  const {post: {_id: postId}} = ownProps;
  return {
    comments: state.entities.posts[postId].comments
    .map(commentId => {
      return state.entities.comments[commentId]
    } )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addLike: (like) => {
      dispatch(addLikeActionCreator(like));
    },
    putComments: (comments) => {
      dispatch(putCommentsActionCreator(comments));
    },
    deleteComment: (comment) => {
      dispatch(deleteCommentActionCreator(comment));
    }
  }
}

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);
export default PostConnected;