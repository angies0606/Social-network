
import classes from "./PostCreator.module.scss";
import classNames from "classnames";
import { useState, useMemo, cloneElement, useEffect } from "react";
import { useProgressContext } from "@features/progress/progress.context";
import { imagesApi } from "@api/api";
import SelectFile from "@ui-kit/SelectFile/SelectFile";
import ImageFilePreview from "@ui-kit/ImagePreview/ImageFilePreview";
import IconButton from "@ui-kit/IconButton/IconButton";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const postTextValidator = (value) => {
  return value?.length <= 750 && value?.length > 0;
};
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
  onPostConfirm,
  textField,
  buttonContent,
  postText = '',
  isShowCancelButton = false,
  cancelChange = null,
  openImageDialog = null,
  post = null,
  wasPostImageChanged = false
}) {
  const {isProgress} = useProgressContext();
  const [textState, setTextState] = useState({
    value: '',
    isValid: false
  });
  const [isAddingImage, setAddingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
   setText(postText);
  }, [postText]);

  const onConfirmPost = () => {
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
      return onPostConfirm(post)
        .then(() => {
          setText('');
          setImageFile(null);
        })
        .finally(() => {
          setAddingImage(false);
        })
    })
  };

  const setText = (text) => {
    setTextState({
      value: text,
      isValid: postTextValidator(text)
    });
  };

  const onTextChange = (e) => {
    const value = e.target.value
    setText(value);
  };

  const textFieldClone = useMemo(() => {
    return cloneElement(textField, {
      className: classNames(textField.props.className, classes.PostCreator__TextField),
      onChange: (e) => {
        onTextChange(e);
      },
      value: textState.value
    });
  }, [textField, textState.value]);

  const onImageSelect = (image) => {
    setAddingImage(true);
    setImageFile(image);
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('img', imageFile);
    return imagesApi.addImage(formData)
      .then(response => {
        return response.imageUrl
      })
  };

  const onClickAddPhotoButton = () => {
    if(post) {
      openImageDialog();
    }
  };

  const onCancel = () => {
    if(imageFile) {
      setImageFile(null);
      setAddingImage(false);
    }
    if(isShowCancelButton) {
      cancelChange();
    }
  };
  
  const isDisabled = () => {
    if(isAddingImage) {
      return false;
    }
    if(wasPostImageChanged) {
      return false;
    }
    if(!textState.isValid || isProgress) {
      return true;
    }
  };

  return (
    <div className={classes.PostCreator__CardContentBox}>
      {textFieldClone}
      {
        imageFile &&
          <ImageFilePreview
            imageFile={imageFile}
            isDeleteShown={true}
            className={classes.PostCreator__ImagePreview}
            deleteImage={onCancel}
          />
      }
      {/* <FormControl sx={{ width: '100%' }}>
        <MyFormHelperText /> 
      </FormControl> */}
      <div className={classes.PostCreator__CardActions} >
        <div className={classes.PostCreator__ButtonsContainer}>
          <Button 
            className={classes.PostCreator__Button}
            variant='outlined'
            onClick={onConfirmPost}
            disabled={isDisabled()}
          >
            {buttonContent}
          </Button>
          {isShowCancelButton || imageFile ?
            <Button 
              className={classes.PostCreator__Button}
              variant='outlined'
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
            post={post}
          >
            <IconButton onClick={onClickAddPhotoButton}>
              <AddPhotoAlternateIcon />
            </IconButton>
          </SelectFile>
        </div>
      </div>
    </div> 
  )
}

export default PostCreator;