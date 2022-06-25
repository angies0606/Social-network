import classes from "./PostsBlock.module.css";
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@features/auth/auth.context";
import { useProgressContext } from "@features/progress/progress.context";
import { postsApi } from "@api/api";
import Card from "@mui/material/Card";
import { CardContent, TextField } from "@mui/material";
import PostConnected from "./Post/PostConnected";
import PostCreator from "./PostCreator/PostCreator";
import List from "@ui-kit/List/List";
import {useScrollContext} from "@features/scroll/scroll.context";

const pageSize = 5;

const PostsBlock = ({
  profileUser,
  isForCurrentUser,
  addPost,
  posts,
  deletePost,
  editPost,
  addPosts,
  setPosts,
  newPost
}) => {
  const {state: {user: authedUser}} = useAuthContext();
  const {isProgress} = useProgressContext();
  const [isHasMore, setIsHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollableTargetId = useScrollContext();

  const loadNextPage = useCallback(() => {
    if (!profileUser) return;

    return postsApi.getPosts(profileUser._id, {page, limit: pageSize, sort: {createdAt: -1}})
      .then(response => {
        addPosts(response.items.map(post => {
          return {
            ...post,
            comments: []
          }
        }));
        setIsHasMore(response.hasNextPage);
        setPage(page + 1);
      });
  }, [profileUser?._id, page]);

  useEffect(() => {
    // nextMethod
    setPosts([]);
    setPage(1);
    loadNextPage();
  }, [profileUser?._id]);

  const onAddPost = (post) => {
    const newPostData = {
      ...post
    }
    return postsApi.createPost(newPostData)
      .then(post => {
        newPost(post);
      });
  };

  const onEditPost = (post) => {
    return postsApi.editPost(post)
      .then(post => {
        editPost(post);
      })
  };

  const onDeletePost = (postId) => {
    return postsApi.deletePost(postId)
      .then(postId => {
        deletePost(postId);
      })
  };

  const isPostsShown = isHasMore && posts.length !== 0;

  // const isPostShown = posts?.length > 0 && isPostsReady;

  // let postsElements = posts.map((post, index) => 
  //   <PostConnected 
  //     post={post}
  //     key={index}
  //     deletePost={onDeletePost}
  //     editPost={onEditPost}
  //     editPostImage={editPost}
  //     profileUser={profileUser}
  //     profileUserId={profileUserId}
  //     isForCurrentUser={isForCurrentUser}
  //     authedUser={authedUser}
  //     isProgress={isProgress}
  //   />
  // );

 return (
    <div className={classes.PostsBlock}>
      {/* <div className={classes.PostsBlock__Header}>
        <h3>
          Мои записи
        </h3>
      </div> */}
      <div className={classes.PostsBlock__Posts}>
        {
          isForCurrentUser &&
          <Card className={classes.PostsBlock__PostsCreatorCard}>
            <PostCreator
              onPostConfirm={onAddPost}
              buttonContent={'Поделиться'}
              textField={
                <TextField
                  className={classes.PostsBlock__TextField}
                  label='Добавить запись'
                  placeholder='Что у Вас нового?'
                  color='success'
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                />
              }
            />
          </Card>
        }
          <List
            items={posts}
            nextMethod={loadNextPage}
            isHasMore={isHasMore}
            scrollableTargetId={scrollableTargetId}
            itemBuilder={post => (
              <PostConnected 
                post={post}
                key={post._id}
                deletePost={onDeletePost}
                editPost={onEditPost}
                editPostImage={editPost}
                profileUser={profileUser}
                isForCurrentUser={isForCurrentUser}
                authedUser={authedUser}
                isProgress={isProgress}
              />
            )}
            noData={
            <Card className={classes.PostsBlock__NoDataCard}>
                <CardContent className={classes.PostsBlock__NoDataText}>
                  Нет записей
                </CardContent>
             </Card>
            }
          />
        {/* } */}
      </div>
    </div>
  )
}

export default PostsBlock;