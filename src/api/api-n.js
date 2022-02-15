// @ts-nocheck
import instance from "@api/axios";

export const postsApi = {
  getPosts(userId) {
    return instance.get('posts', {
      params: {
        user: userId
      }
    })
  },
  createPost(payload) {
    return instance.post('posts', payload)
  },
  deletePost(postId) {
    return instance.delete(`posts/${postId}`)
      .then(res => res._id);
  },
  editPost(post) {
    return instance.patch(`posts/${post._id}`, post)
  },
  addLike(postId, userId) {
    return instance.post(`posts/${postId}/like`, {userId})
    
  }
}




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
