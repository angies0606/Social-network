// @ts-nocheck
import instance from "@api/axios";

export const authApi = {
  register(email, nickname, password) {
    return instance.post('auth/register', {email, nickname, password});
  },
  login(login, password) {
    return instance.post('auth/login', {login, password});
  },
  logout() {
    return instance.post('auth/logout');
  },
  me() {
    return instance.post('auth/me');
  }
};

export const usersApi = {
  getUser(userId) {
    return instance.get(`users/${userId}`);
  },
  getUsers(params) {
    return instance.get('/users', {
      params
    });
  },
  changeUserAvatar(imageData) {
    return instance.post(`user/avatar`, imageData);
  },
  changeUserBanner(imageData) {
    return instance.post(`user/banner`, imageData);
  },
  deleteUserAvatar(avatar) {
    return instance.delete('user/avatar', {data: {avatar}});
  },
  deleteUserBanner(banner) {
    return instance.delete('user/banner', {data: {banner}});
  },
  // getStatus(userId) {
  //   return instance.get(`profile/status/${userId}`);
  // },
  // updateStatus(status) {
  //   return instance.put(`profile/status/`, {status: status}); //TODO: доделать статус?
  // }
};

export const postsApi = {
  getPosts(userId, params) {
    return instance.get(`posts/${userId}`, {
      params
    });
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
};

export const imagesApi = {
  addImage(imageData) {
    return instance.post('images', imageData);
  },
  deleteImage(imageUrl) {
    return instance.delete('images', imageUrl);
  }
};

// getUsers (currentPage = 1, pageSize = 10) {
//   return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//   .then(response => {
//     return  response.data;
//   });
// },

