import classes from "./CommentsCreator.module.css";
import { useState } from "react";
import { useProgress } from "@features/progress/useProgress.js";
import { FormControl } from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import Button from "@ui-kit/Button/Button";
import Avatar from "@ui-kit/Avatar/Avatar";
import { commentTextValidator } from "@utils/validators/validators";

function CommentsCreator ({
  authedUser,
  confirmed,
}) {
  const{increment, decrement, isProgress} = useProgress();
  
  const [textState, setTextState] = useState({
    value: '',
    isValid: false
  });

  const setText = (text) => {
    setTextState({
      value: text,
      isValid: commentTextValidator(text)
    });
  };

  const onTextChange = (e) => {
    const value = e.target.value
    setText(value);
  };

  const onConfirm = () => {
    increment();
    const comment = {
      text: textState.value
    };

    confirmed(comment)
    .then(() => {
      setText('');
      decrement();
    })
  };

  const isDisabled = () => {
    return !textState.isValid || isProgress;
  };

  return (
    <div className={classes.CommentsCreator__Box}>
      <div className={classes.CommentsCreator__UserCommentBox}>
        <Avatar
          className={classes.CommentsCreator__Avatar}
          userAvatar={authedUser.avatar}
          avatarHeight={30}
          avatarWidth={30}
        />
        <FormControl
          className={classes.CommentsCreator__TextField}
          variant='filled'
          sx={{}}
        >
          <FilledInput
            placeholder={'Написать комментарий...'}
            multiline
            fullWidth
            maxRows={4}
            color='success'
            size='small'
            sx={{}}
            onChange={onTextChange}
            value={textState.value}
          />
        </FormControl>
      </div>
      <Button
        className={classes.CommentsCreator__Button}
        variant='outlined'
        color='success'
        sx={{ height: 30 }}
        onClick={onConfirm}
        disabled={isDisabled()}
      >
        Отправить
      </Button>
    </div>
  )
}

export default CommentsCreator;