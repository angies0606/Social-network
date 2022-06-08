// @ts-nocheck
import instance from "@api/axios";

export const authApi = {
  register(name, nickname, password) {
    return instance.post('auth/register', {name, nickname, password});
  },
  login(nickname, password) {
    return instance.post('auth/login', {nickname, password});
  },
  logout() {
    return instance.post('auth/logout');
  },
  me() {
    return instance.post('auth/me');
  }
}
export const imagesApi = {
  addImage(imageData) {
    return instance.post('images', imageData);
  },
  deleteImage(imageUrl) {
    return instance.delete('images', imageUrl);
  },

}

export const usersApi = {
  getUser(userId) {
    return instance.get(`users/${userId}`);
  },
  getUsers() {
    return instance.get('/users');
  },
  changeUserAvatar(imageData, userId) {
    return instance.post(`user/${userId}/avatar`, imageData);
  },
  changeUserBanner(imageData, userId) {
    return instance.post(`user/${userId}/banner`, imageData);
  },
  deleteUserAvatar(avatar) {
    return instance.delete('user/avatar', {data: {avatar}});
  },
  deleteUserBanner(banner) {
    return instance.delete('user/banner', {data: {banner}});
  }
}

export const postsApi = {
  getPosts(userId, authedUserId) {
    return instance.get(`posts/${userId}`, {params: {authedUserId}});
  },
  createPost(payload) {
    return instance.post('posts', payload);
  },
  deletePost(postId) {
    return instance.delete(`posts/${postId}`)
  },
  editPost(post) {
    return instance.patch(`posts/${post._id}`, post);
  },
  addLike(postId) {
    return instance.post(`posts/${postId}/like`);
  },
  removeLike(postId) {
    return instance.delete(`posts/${postId}/like`);
  },
  addComment(comment) {
    return instance.post(`posts/${comment.postId}/comment`, comment);
  },
  getComments(postId) {
    return instance.get(`posts/${postId}/comments`);
  },
  deleteComment(commentId) {
    return instance.delete(`comments/${commentId}`);
  },
  deleteImage(postId) {
    return instance.delete(`posts/${postId}/image`);
  }
}





// export const profileAPI = {
//   getProfile(userId) {
//     return instance.get(`profile/${userId}`);
//   },
//   getStatus(userId) {
//     return instance.get(`profile/status/${userId}`);
//   },
//   updateStatus(status) {
//     return instance.put(`profile/status/`, {status: status});
//   }
// }




// getUsers (currentPage = 1, pageSize = 10) {
//   return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//   .then(response => {
//     return  response.data;
//   });
// },

// const getTodos = useCallback((page) => {
//   if (!todoList) {
//     return
//   }

//   return api.getTodos(todoList.id, page, pageSize)
//     .then(todos => {
//       addTodos(todos);
//     });
// }, [todoList?.id, addTodos])
