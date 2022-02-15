
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import classes from './CommentsCreator.module.css';
import { FormControl } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import { InputAdornment } from '@mui/material';
import IconButton from '@ui-kit/IconButton/IconButton';
import Button from '@ui-kit/Button/Button';


function CommentsCreator ({
  authUserId
}) {
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
          />
        </FormControl>
      </div>
      <Button
        className={classes.CommentsCreator_Button}
        variant="outlined"
        sx={{ height: 30 }}
      >
        Отправить
      </Button>
    </div>
  )
}

export default CommentsCreator;