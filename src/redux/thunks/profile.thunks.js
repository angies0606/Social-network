// export const getUserStatus = (userId) => (dispatch) => {
//   profileAPI.getStatus(userId) 
//     .then(response => {
//     dispatch(setStatus(response.data));
//   });
// }

// export const updateUserStatus = (status) => (dispatch) => {
//   profileAPI.updateStatus(status) 
//     .then(response => {
//       if(response.data.resultCode === 0) {
//         dispatch(setStatus(status));
//       }
//   });
// }