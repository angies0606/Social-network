// @ts-nocheck
import instance from "@api/axios";

export const postsApi = {
  getPosts(userId) {
    return instance.get('posts', {
      params: {
        user: userId
      }
    });
  },
  createPost(payload) {
    return instance.post('posts', payload);
  },
  deletePost(postId) {
    return instance.delete(`posts/${postId}`)
      .then(res => res._id);
  },
  editPost(post) {
    return instance.patch(`posts/${post._id}`, post);
  },
  addLike(postId, userId) {
    return instance.post(`posts/${postId}/like`, {userId});
    
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
  addImage(imageData) {
    return instance.post('images', imageData);
  }
}

export const authApi = {
  register(user) {
    return instance.post('auth/register', user);
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

export const usersApi = {
  getUser(userId) {
    return instance.get(`users/${userId}`);
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
