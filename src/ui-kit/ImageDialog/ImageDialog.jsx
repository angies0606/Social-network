import classes from "./ImageDialog.module.scss";
import { useState } from "react";
import MUIDialog from "@mui/material/Dialog";
import MUIDialogActions from "@mui/material/DialogActions";
import MUIDialogContent from "@mui/material/DialogContent";
import MUIDialogTitle from "@mui/material/DialogTitle";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SelectFile from "@ui-kit/SelectFile/SelectFile";
// import ImageFilePreview from "@ui-kit/ImagePreview/ImageFilePreview";
import ImageFilePreview from "@ui-kit/ImageFilePreview/ImageFilePreview";

function ImageDialog({
  isShown,
  title,
  closeDialog,
  onImageConfirm,
  isProgress
}) {
  //TODO: навесить стили на Dialog
  const [imageFile, setImageFile] = useState(null);

  const onConfirm = () => {
    onImageConfirm(imageFile)
    .then(() => {
      onCloseDialog();
    })
  };

  const onImageSelect = (image) => {
    setImageFile(image);
  };

  const onCloseDialog = () => {
    if(imageFile) {
      setImageFile(null);
    }
    closeDialog();
  };

  return (
    <div>
      <MUIDialog
        open={isShown}
        onClose={onCloseDialog}
      >
        <MUIDialogTitle className={classes.ImageDialog__Title}>
          {title}
        </MUIDialogTitle>
        <MUIDialogContent className={classes.ImageDialog__Content}>
          {
            imageFile &&
              <ImageFilePreview
                imageFile={imageFile}
              />
          }
        </MUIDialogContent>
        <MUIDialogActions className={classes.ImageDialog__ButtonContainer}>
          <SelectFile 
            onFileSelect={onImageSelect}
            isDisabled={isProgress}
          >
            <Button 
              startIcon={<AddPhotoAlternateIcon />}
              disabled={isProgress}
              className={classes.ImageDialog__Button}
              color='success'
            >
              Выбрать
            </Button>
          </SelectFile>
          {imageFile && 
            <Button 
              onClick={onConfirm}
              disabled={isProgress}
              className={classes.ImageDialog__Button}
              color='success'
            >
              Подтвердить
            </Button>
          }
          <Button 
            onClick={onCloseDialog}
            disabled={isProgress}
            className={classes.ImageDialog__Button}
            color='success'
          >
            Отмена
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  );
}

export default ImageDialog;