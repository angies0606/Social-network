
export const ADD_POST = 'ADD_POST';
export function addPostActionCreator(post) {
  return {
    type: ADD_POST,
    data: post
  };
}

export const SET_POSTS = 'SET_POSTS';
export function setPostsActionCreator(posts) {
  return {
    type: SET_POSTS,
    data: posts
  }
}

export const DELETE_POST = 'DELETE_POST';
export function deletePostActionCreator(postId) {
  return {
    type: DELETE_POST,
    data: postId
  }
}
export const EDIT_POST = 'EDIT_POST';
export function editPostActionCreator(post) {
  return {
    type: EDIT_POST,
    data: post
  }
}

export const SET_LIKE = 'SET_LIKE';
export function setLikeActionCreator(data) {
  return {
    type: SET_LIKE,
    data
  }
}

export const PUT_COMMENTS = 'PUT_COMMENTS';
export function putCommentsActionCreator(data) {
  return {
    type: PUT_COMMENTS,
    data
  }
}

export const DELETE_COMMENT = 'DELETE_COMMENT';
export function deleteCommentActionCreator(data) {
  return {
    type: DELETE_COMMENT,
    data
  }
}

