
import {useState, useMemo, Children, cloneElement, useEffect, useCallback} from 'react';
import Card from "@mui/material/Card";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import classes from "./PostCreator.module.css";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MuiButton from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@ui-kit/IconButton/IconButton';
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { TryRounded } from "@mui/icons-material";
import classNames from 'classnames';


const postTextValidator = (value) => {
  return value?.length <= 750 && value?.length > 0;
}
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
  confirmed,
  textField,
  // isClearOnConfirm,
  buttonContent,
  postText = '',
  // changeMode,
  isShowCancelButton,
  cancelChange
}) {
  //TODO: возможность добавлять картинки и геолокацию
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

  useEffect(() => {
   setText(postText);
  }, [postText]);

  function setText(text) {
    setTextState({
      value: text,
      isValid: postTextValidator(text)
    });
  }

  const onTextChange = (e) => {
    const value = e.target.value
    setText(value);
  }

  const onKeyPress = e => {
    if (e.which === 13) {
      if (isDisabled()) {
        return;
      }
      onConfirm();
    }
  }

  const onConfirm = () => {
    startProgress();
    const post = {
      text: textState.value,
      image: null // TODO: переписать, когда буду подгружать картинки
    };
    confirmed(post)
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

  const textFieldClone = useMemo(() => {
    return cloneElement(textField, {
      className: classNames(textField.props.className, classes.PostCreator__TextField),
      onChange: (e) => {
        onTextChange(e);
      },
      onKeyPress: (e) => {
        onKeyPress(e);
      },
      value: textState.value
    });
  }, [textField, textState.value]);

  return (
    <div className={classes.PostCreator__CardContentBox}>
      {textFieldClone}
      {/* <FormControl sx={{ width: '100%' }}>
        <MyFormHelperText /> 
      </FormControl> */}
      <div className={classes.PostCreator__CardActions} >
        <div className={classes.PostCreator__ButtonsContainer}>
          <Button 
            className={classes.PostCreator__Button}
            variant="outlined"
            onClick={onConfirm}
            disabled={isDisabled()}
          >
            {buttonContent}
          </Button>
          {isShowCancelButton && 
            <Button 
              className={classes.PostCreator__Button}
              variant="outlined"
              onClick={cancelChange}
            >
              Отмена
            </Button>
          }
        </div>
        <div className={classes.PostCreator__IconsContainer}>
          <IconButton>
            <AddPhotoAlternateIcon />
          </IconButton>
          <IconButton>
            <MapIcon /> 
          </IconButton>
        </div>
      </div>
    </div> 
  )
}

export default PostCreator;