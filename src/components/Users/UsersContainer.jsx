import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleFollowingInProgress, toggleIsFetching, unfollow } from "../redux/Users-reducer";
import Users from "./Users";
import * as axios from "axios";
import React from "react";
import Preloader from "../Preloader/Preloader";
import { getUsers, usersAPI } from "../../api/api";


class UsersContainer extends React.Component { 
  constructor(props) {
    super(props);
  }
  
  componentDidMount() { // запрос на сервак для запроса пользователей
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
    });
  }

  onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      this.props.toggleIsFetching(true);
      usersAPI.getUsers(pageNumber, this.props.pageSize)
        .then(data => {
          this.props.toggleIsFetching(false);
          this.props.setUsers(data.items);
      
        }); 
  }

  render() {
    return <>
    {this.props.isFetching ? Preloader : null}
    <Users totalUsersCount={this.props.totalUsersCount} 
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                  followingInProgress={this.props.followingInProgress} />
  </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress

  }
}

// let mapDispatchToProps = (dispatch) => { - былa в connect - затем сократили код и в колбэки переместили просто объекты
//   return {
//     follow: (userId) => {
//       dispatch(followCreator(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowCreator(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersCreator(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageCreator(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountCreator(totalCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingCreator(isFetching));
//     }

//   }
// }

// export default connect(mapStateToProps, { - было так, а потом просто записали без ключей - только значения (колбэки)
//   follow: followCreator,
//   unfollow: unfollowCreator,
//   setUsers: setUsersCreator,
//   setCurrentPage: setCurrentPageCreator,
//   setTotalUsersCount: setTotalUsersCountCreator,
//   toggleIsFetching: toggleIsFetchingCreator
// })(UsersContainer);
// 
export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingInProgress
})(UsersContainer);
