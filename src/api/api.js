import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "70f4bfee-9d8e-4a05-ad99-d34f716a608f"
  }
});
export const usersAPI = {
  getUsers (currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => {
      return  response.data;
    });
  }
}

 


