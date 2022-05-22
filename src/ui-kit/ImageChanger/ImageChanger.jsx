import Dialog from '@ui-kit/Dialog/Dialog';
import { useState, Children, cloneElement, useCallback, useEffect } from 'react';

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
  }

  const onCloseDialog = () => {
    setIsDialogOpened(false);
  }
  return (
    <>
      {Children.map(children, (child) => {
            //переопределяем у каждого child пропс onClick и добавляем обработку закрытия меню
            return cloneElement(child, {
              onClick: () => {
                setIsDialogOpened(true);
              }
            });
          })}
      <Dialog 
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