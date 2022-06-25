import classes from "./PostCreator.module.scss";
import classNames from "classnames";
import { useState, useMemo, cloneElement, useEffect } from "react";
import { useProgressContext } from "@features/progress/progress.context";
import { imagesApi } from "@api/api";
import SelectFile from "@ui-kit/SelectFile/SelectFile";
import ImageFilePreview from "@ui-kit/ImageFilePreview/ImageFilePreview";
// import ImageFilePreview from "@ui-kit/ImagePreview/ImageFilePreview";
import IconButton from "@ui-kit/IconButton/IconButton";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { postTextValidator, postValidator } from "@utils/validators/validators";

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
  wasPostImageChanged = false,
  isImageInPost = false,
  wasImageInPost = false
}) {
  const {isProgress} = useProgressContext();
  const [textState, setTextState] = useState({
    value: '',
    isValid: false
  });

  const [isAddingImage, setAddingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [wasTextChanged, setWasTextChanged] = useState(false);

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
          setWasTextChanged(false);
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
    setWasTextChanged(true);
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

  const onClickAddImageButton = () => {
    if(post) {
      openImageDialog();
    }
  };

  const onCancel = () => {
    if(imageFile) {
      setImageFile(null);
      setAddingImage(false);
    }
    if(post) {
      cancelChange();
      setWasTextChanged(false);
    }
  };
  
  const isDisabled = () => {
    if (post) {
      let isPostValid = postValidator(textState.isValid, textState.value, isImageInPost);

      switch(true) {
        case isProgress: 
          return true;
        case !isPostValid:
          return true;
        case isPostValid && !wasTextChanged && wasPostImageChanged && !wasImageInPost && !isImageInPost:
          return true;
        case isPostValid && (wasPostImageChanged || wasTextChanged):
          return false;
        case isPostValid && !wasPostImageChanged && !wasTextChanged:
          return true;
        default: return false;
      }
    }
    else {
      switch (true) {
        case isAddingImage:
          return false;
        case !textState.isValid || isProgress:
          return true;
        default: return false;
      }
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
            onDeleteImage={onCancel}
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
            color='success'
            onClick={onConfirmPost}
            disabled={isDisabled()}
          >
            {buttonContent}
          </Button>
          {isShowCancelButton || imageFile ?
            <Button 
              className={classes.PostCreator__Button}
              variant='outlined'
              color='success'
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
            isDisabled={isImageInPost || isAddingImage}
            post={post}
          >
            <IconButton 
              onClick={onClickAddImageButton}
            >
              <AddPhotoAlternateIcon className={classes.PostCreator__IconButton}/>
            </IconButton>
          </SelectFile>
        </div>
      </div>
    </div> 
  )
}

export default PostCreator;