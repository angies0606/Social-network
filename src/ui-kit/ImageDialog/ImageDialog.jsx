import {useState} from "react";
import MUIDialog from "@mui/material/Dialog";
import MUIDialogActions from "@mui/material/DialogActions";
import MUIDialogContent from "@mui/material/DialogContent";
import MUIDialogContentText from "@mui/material/DialogContentText";
import MUIDialogTitle from "@mui/material/DialogTitle";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SelectFile from "@ui-kit/SelectFile/SelectFile";
import { useProgressContext } from "@features/progress/progress.context";
import { imagesApi, usersApi } from '@api/api-n';
import ImagePreview from "@ui-kit/ImagePreview/ImageFilePreview";
import ImageConvertor from "@features/ImageConverter/ImageConverter";
import ImageFilePreview from "@ui-kit/ImagePreview/ImageFilePreview";

function ImageDialog({
  isShown,
  title,
  closeDialog,
  onImageConfirm,
  isProgress
}) {
  //TODO: навесить стили на Dialog
  // const {isProgress} = useProgressContext();
  const [imageFile, setImageFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);

  const onImageSelect = (image) => {
    setImageFile(image);
  }

  const onConfirm = () => {
    onImageConfirm(imageFile)
    .then(() => {
      onCloseDialog();
    })
  }

  const onCloseDialog = () => {
    if(imageFile) {
      setImageFile(null);
    }
    closeDialog();
  }

  return (
    <div>
      <MUIDialog
        open={isShown}
        onClose={onCloseDialog}
      >
        <MUIDialogTitle>
          {title}
        </MUIDialogTitle>
        <MUIDialogContent>
          {
            imageFile &&
              <ImageFilePreview
                imageFile={imageFile}
                isDeleteShown={false}
              />
                

            
            // <ImageConvertor imageData={imageFile}>
            //   <ImagePreview
            //     // className={classes.PostCreator__ImagePreview}
            //     isImageInfoShown={true}
            //     isDeleteShown={false}
            //   />
            // </ImageConvertor>
          }
        </MUIDialogContent>
        <MUIDialogActions>
          <SelectFile 
            onFileSelect={onImageSelect}
            isDisabled={isProgress}
          >
            <Button 
              startIcon={<AddPhotoAlternateIcon />}
              disabled={isProgress}
            >
              Выбрать
            </Button>
          </SelectFile>
          {imageFile && 
            <Button 
              onClick={onConfirm}
              disabled={isProgress}
            >
              Подтвердить
            </Button>
          }
          <Button 
            onClick={onCloseDialog}
            disabled={isProgress}
          >
            Отмена
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  );
}

export default ImageDialog;