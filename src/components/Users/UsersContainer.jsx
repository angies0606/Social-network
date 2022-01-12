import { connect } from "react-redux";
import { follow, getUsers, setCurrentPage, toggleFollowingInProgress, unfollow } from "../redux/Users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../Preloader/Preloader";
import { withAuthRedirectComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getPageSize, getTotalUsersCount, getUserS, getCurrentPage, getIsFetching, getFollowingInProgress } from "../redux/users-selector";


class UsersContainer extends React.Component { 
  constructor(props) {
    super(props);
  }
  
  componentDidMount() { // запрос на сервак для запроса пользователей
   this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize );   
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
                  followingInProgress={this.props.followingInProgress} />
  </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUserS(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)

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

export default compose(
  // withAuthRedirectComponent,
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingInProgress,
    getUsers
  })
)(UsersContainer);

