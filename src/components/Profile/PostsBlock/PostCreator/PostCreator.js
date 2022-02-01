import { ClassNames } from "@emotion/react";
import {useState, useMemo} from 'react';
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import classes from "./PostCreator.module.css";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import FormHelperText from '@mui/material/FormHelperText';

// function MyFormHelperText() {
//   const { focused } = useFormControl() || {};

//   const helperText = useMemo(() => {
//     if (focused) {
//       return 'Введите не больше 10 символов';
//     }
//     return;
//   }, [focused]);

//   return <FormHelperText>{helperText}</FormHelperText>;
// }

function PostCreator ({
  onAddPost
}) {
  //TODO: возможность добавлять картинки и геолокацию
  const [text, setText] = useState({
    value: '',
    isValid: false
  })

  const onTextChange = (e) => {
    const value = e.target.value
    setText({
      value: value,
      isValid: value?.length <= 10 && value?.length > 0
    });
  }

  const onKeyPress = e => {
    if (e.which === 13) {
      if (isDisabled()) {
        return;
      }
      addPostOnServer();
    }
  }

  const addPostOnServer = () => {
    const newPost = {
      text: text.value,
      image: null // TODO: переписать, когда буду подгружать картинки
    };
    onAddPost(newPost)
    .then(() => {
      setText({
        value: '',
        isValid: false
      })
    })
  }

  const isDisabled = () => {
    return !text.isValid;
  }

  return(
    <Card className={classes.PostCreator__Card}>
      <div className={classes.PostCreator__CardContentBox}>
        <TextField 
          className={classes.PostCreator__TextField}
          label="Добавить запись"
          placeholder="Что у Вас нового?"
          fullWidth
          multiline
          rows={4}
          onChange={onTextChange}
          onKeyPress={onKeyPress}
          value={text.value}
        />
        {/* <FormControl sx={{ width: '100%' }}>
          <MyFormHelperText /> 
        </FormControl> */}
        <div className={classes.PostCreator__CardActions} >
        <Button 
          className={classes.PostCreator__Button}
          variant="outlined"
          onClick={addPostOnServer}
          disabled={isDisabled()}
        >
          Поделиться
        </Button>
        <IconButton>
          <MapIcon />
        </IconButton>
        </div>
      </div> 
    </Card>
  )
}

export default PostCreator;