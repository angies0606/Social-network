//TODO: запихнуть сюда все экшены

// Actions cвязанные с постами
export const PUT_POSTS = 'PUT_POSTS';
export function putPostsActionCreator(posts) {
  return {
    type: PUT_POSTS,
    data: posts
  };
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

export const ADD_LIKE = 'ADD_LIKE';
export function addLikeActionCreator(payload) {
  return {
    type: ADD_LIKE,
    data: payload
  }
}