
import {useState, useCallback} from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './CommentsCreator.module.css';
import { FormControl } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import Button from '@ui-kit/Button/Button';

const commentTextValidator = (value) => {
  return value?.length <= 750 && value?.length > 0;
}

function CommentsCreator ({
  userId,
  confirmed
}) {
  const [isProgress, setIsProgress] = useState(false);
  const [textState, setTextState] = useState({
    value: '',
    isValid: false
  });

  const startProgress = useCallback(() => {
    setIsProgress(true);
  }, [setIsProgress]);

  const endProgress = useCallback(() => {
    setIsProgress(false);
  }, [setIsProgress]);

  function setText(text) {
    setTextState({
      value: text,
      isValid: commentTextValidator(text)
    });
  }

  const onTextChange = (e) => {
    const value = e.target.value
    setText(value);
  }

  const onConfirm = () => {
    startProgress();
    const comment = {
      userId: userId,
      text: textState.value
    };
    confirmed(comment)
    .then(() => {
      setText('');
    })
    .finally(() => {
      endProgress();
    })
  }

  const isDisabled = () => {
    return !textState.isValid || isProgress;
  }

  return (
    <div className={classes.CommentsCreator_Box}>
      <div className={classes.CommentsCreator_UserCommentBox}>
        <Avatar
          className={classes.CommentsCreator_Avatar}
          src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg"
          sx={{ width: 30, height: 30 }}
        />
        <FormControl
          className={classes.CommentsCreator_TextField}
          variant='filled'
          sx={{}}
        >
          <FilledInput
            placeholder={'Написать комментарий...'}
            multiline
            fullWidth
            maxRows={4}
            size='small'
            sx={{}}
            onChange={onTextChange}
            value={textState.value}
          />
        </FormControl>
      </div>
      <Button
        className={classes.CommentsCreator_Button}
        variant="outlined"
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