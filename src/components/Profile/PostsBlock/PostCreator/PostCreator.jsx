
import {useState, useMemo, Children, cloneElement, useEffect, useCallback} from "react";
import { useProgressContext } from "@features/progress/progress.context";
import Card from "@mui/material/Card";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import classes from "./PostCreator.module.scss";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MuiButton from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from "@ui-kit/IconButton/IconButton";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { TryRounded } from "@mui/icons-material";
import classNames from "classnames";
import SelectFile from "@ui-kit/SelectFile/SelectFile";
import ImagePreview from "@ui-kit/ImagePreview/ImagePreview";
import { imagesApi } from "@api/api-n";


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
  cancelChange,
  // newImage,
  // addImage
}) {
  const {isProgress} = useProgressContext();
  const [textState, setTextState] = useState({
    value: '',
    isValid: false
  });
  const [isAddingImage, setAddingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // const startProgress = useCallback(() => {
  //   setIsProgress(true);
  // }, [setIsProgress]);

  // const endProgress = useCallback(() => {
  //   setIsProgress(false);
  // }, [setIsProgress]);

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

  // const onKeyPress = e => {
  //   if (e.which === 13) {
  //     if (isDisabled()) {
  //       return;
  //     }
  //     onConfirm();
  //   }
  // }

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('img', imageFile);
    return imagesApi.addImage(formData)
      .then(response => {
        return response.imageUrl
      })
  }

  const onConfirm = () => {
    let post = {
      text: textState.value
    };
    
    return Promise.resolve(imageFile 
      ? uploadImage()
          .then(imageUrl => {
            post.image = imageUrl
          })
      : null
    ).then(() => {
      return confirmed(post)
        .then(() => {
          setText('');
          setImageFile(null);
        })
        .finally(() => {
          setAddingImage(false);
        })
    })
  }
    
  const isDisabled = () => {
    if(isAddingImage) {
      return false;
    }
    if(!textState.isValid || isProgress) {
      return true;
    }
  }

  const textFieldClone = useMemo(() => {
    return cloneElement(textField, {
      className: classNames(textField.props.className, classes.PostCreator__TextField),
      onChange: (e) => {
        onTextChange(e);
      },
      // onKeyPress: (e) => {
      //   onKeyPress(e);
      // },
      value: textState.value
    });
  }, [textField, textState.value]);

  const onImageSelect = (image) => {
    setAddingImage(true);
      setImageFile(image);
  }

  const onCancel = () => {
    if(imageFile) {
      setImageFile(null);
      setAddingImage(false);
    }
    if(isShowCancelButton) {
      cancelChange();
    }
  }

  return (
    <div className={classes.PostCreator__CardContentBox}>
      {textFieldClone}
      {
        imageFile &&
        <ImagePreview
          className={classes.PostCreator__ImagePreview}
          image={imageFile}
        />
      }
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
          {isShowCancelButton || imageFile ?
            <Button 
              className={classes.PostCreator__Button}
              variant="outlined"
              onClick={onCancel}
              disabled={isProgress}
            >
              Отмена
            </Button> :
            null
          }
        </div>
        <div className={classes.PostCreator__IconsContainer}>
          <SelectFile 
            onFileSelect={onImageSelect}
            isDisabled={isAddingImage}
          >
            <IconButton>
              <AddPhotoAlternateIcon />
            </IconButton>
          </SelectFile>
          {/* <IconButton>
            <MapIcon /> 
          </IconButton> */}
        </div>
      </div>
    </div> 
  )
}

export default PostCreator;