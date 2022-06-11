import { useState, Children, cloneElement, useCallback } from "react";
import ImageDialog from "@ui-kit/ImageDialog/ImageDialog";

function ImageChanger ({
  children,
  onImageChange,
  title,
  isProgress
}) {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const onImageDataFormed = (image) => {
    const formData = new FormData();
    formData.append('img', image);
    return onImageChange(formData)
      .then(() => {
        onCloseDialog();
      })
  };

  const onCloseDialog = () => {
    setIsDialogOpened(false);
  };
  
  return (
    <>
      {Children.map(children, (child) => {
            return cloneElement(child, {
              onClick: () => {
                setIsDialogOpened(true);
              }
            });
          })}
      <ImageDialog 
        isShown={isDialogOpened}
        title={title}
        closeDialog={onCloseDialog}
        onImageConfirm={onImageDataFormed}
        isProgress={isProgress}
      />
    </>
  )
}

export default ImageChanger;