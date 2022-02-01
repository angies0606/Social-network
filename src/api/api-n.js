import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const postsApi = {
  getPosts(userId) {
    return instance.get('posts', {
      params: {
        user: userId
      }
    })
    .then(res => res.data)
  },
  createPost(payload) {
    return instance.post('posts', payload)
    .then(res => res.data);
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
