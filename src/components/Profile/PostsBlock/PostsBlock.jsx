import classes from "./PostsBlock.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "@features/auth/auth.context";
import { useProgressContext } from "@features/progress/progress.context";
import { postsApi } from "@api/api";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import PostConnected from "./Post/PostConnected";
import PostCreator from "./PostCreator/PostCreator";

const PostsBlock = ({
  profileUser,
  profileUserId,
  isForCurrentUser,
  addPost,
  posts,
  deletePost,
  editPost,
  setPosts
}) => {
const {state: {user: authedUser}} = useAuthContext();
const {isProgress} = useProgressContext();
const [isPostsReady, setPostsIsReady] = useState(false);

  useEffect(() => {
    postsApi.getPosts(profileUserId)
      .then(posts => {
        setPostsIsReady(true);
        setPosts(posts.map(post => {
          return {
            ...post,
            comments: []
          }
        }));
      });
  }, [profileUserId]);

  const onAddPost = (newPost) => {
    const newPostData = {
      ...newPost
    }
    return postsApi.createPost(newPostData)
      .then(post => {
        addPost([post]);
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

  // const isPostShown = posts?.length > 0 && isPostsReady;

  let postsElements = posts.map((post, index) => 
    <PostConnected 
      post={post}
      key={index}
      deletePost={onDeletePost}
      editPost={onEditPost}
      editPostImage={editPost}
      profileUser={profileUser}
      profileUserId={profileUserId}
      isForCurrentUser={isForCurrentUser}
      authedUser={authedUser}
      isProgress={isProgress}
    />
  );

 return (
    <div className={classes.PostsBlock}>
      <div className={classes.PostsBlock__Header}>
        <h3>
          Мои записи
        </h3>
      </div>
      <div className={classes.PostsBlock_Posts}>
        {
          isForCurrentUser &&
          <Card className={classes.PostsBlock_PostsCreatorCard}>
            <PostCreator
              onPostConfirm={onAddPost}
              buttonContent={'Поделиться'}
              textField={
                <TextField
                  className={classes.PostsBlock__TextField}
                  label='Добавить запись'
                  placeholder='Что у Вас нового?'
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                />
              }
            />
          </Card>
        }
        {
        //  isPostShown &&
          postsElements
        }
      </div>
    </div>
  )
}

export default PostsBlock;