import classes from "./CommentsBlock.module.scss";
import { useState, useEffect, useCallback } from "react";
import { postsApi } from "@api/api";
import { useAuthContext } from "@features/auth/auth.context";
import { CardContent } from "@mui/material";
import Separator from "@ui-kit/Separator/Separator.jsx";
import Comment from "../Comment/Comment";
import CommentsCreator from "../CommentsCreator/CommentsCreator";
import List from "@ui-kit/List/List";
import Button from "@ui-kit/Button/Button";

const pageSize = 5;

function CommentsBlock ({
  comments,
  expanded,
  postId,
  putComments,
  deleteComment
}) {
  const {state: {user: authedUser}} = useAuthContext();
  const [isHasMore, setIsHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(expanded) {
      setPage(1);
      loadNextPage()
    }
  }, [expanded])

  const loadNextPage = useCallback(() => {
    postsApi.getComments(postId, {page, limit: pageSize, sort: {createdAt: 1}})
          .then(response => {
            putComments(response.items)
            setIsHasMore(response.hasNextPage);
            setPage(page + 1);
          })
  }, [putComments, page]);

  const onAddComment = (commentData) => {
    return postsApi.addComment({
      postId, 
      ...commentData
    })
      .then(response => {
        putComments([response]);
      })
  };

  const onDeleteComment = (commentId) => {
    return postsApi.deleteComment(commentId)
      .then(comment => {
        deleteComment(comment);
      })
  };

  return (
    <CardContent
      className={classes.CommentsBlock__Container}
    >
      <List
        items={comments}
        isHasMore={isHasMore}
        itemBuilder={comment => (
          <div key={comment._id} className={classes.CommentsBlock__CommentContainer}>
            <Separator />
            <Comment 
              comment={comment}
              deleteComment={onDeleteComment}
              authedUserId={authedUser._id}
            />
          </div>
        )}
      />
      {isHasMore 
        && 
        <div className={classes.CommentsBlock__ButtonBox}>
          <Button 
            onClick={loadNextPage}
            sx={{fontWeight: 'bolder'}}
          >
            Показать еще
          </Button>
        </div>
      }
    
    <Separator />

    <CommentsCreator 
      authedUser={authedUser}
      confirmed={onAddComment}
    />
  </CardContent>
  )
}

export default CommentsBlock;

