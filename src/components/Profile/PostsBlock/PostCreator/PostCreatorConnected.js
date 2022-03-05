import { connect } from "react-redux";
import {
  // addImageActionCreator
} from "@redux/actions/post.actions";
import PostCreator from "./PostCreator.jsx";


let mapStateToProps = (state, ownProps) => {

  return {
   
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // addImage: (image) => {
    //   dispatch(addImageActionCreator(image));
    // }
  }
}

const PostCreatorConnected = connect(mapStateToProps, mapDispatchToProps)(PostCreator);
export default PostCreatorConnected;