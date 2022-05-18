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
import { imagesApi } from '@api/api-n';
import ImagePreview from "@ui-kit/ImagePreview/ImagePreview";

function Dialog({
  isShown,
  item,
  closeDialog
}) {
  //TODO: навесить стили на Dialog
  const {isProgress} = useProgressContext();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onImageSelect = (image) => {
    setImageFile(image);
    const formData = new FormData();
    formData.append('img', image);

    imagesApi.addImage(formData)
      .then((response) => {
        setImageUrl(response.imageUrl);
      })
  }

  const onCloseDialog = () => {
    if(imageFile && imageUrl) {
      // imagesApi.deleteImage(imageUrl)
      //   .then(() => {
      //     setImageFile(null);
      //     setImageUrl(null);
      //   })
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
          Изменить {item}
        </MUIDialogTitle>
        <MUIDialogContent>
          {
            imageFile &&
            <ImagePreview
              // className={classes.PostCreator__ImagePreview}
              image={imageFile}
            />
          }
        </MUIDialogContent>
        <MUIDialogActions>
          <SelectFile 
            onFileSelect={onImageSelect}
            isDisabled={isProgress}
          >
            <Button 
              startIcon={<AddPhotoAlternateIcon />}
            >
              Изменить
            </Button>
          </SelectFile>
          
          <Button onClick={onCloseDialog}>
            Отмена
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  );
}

export default Dialog;