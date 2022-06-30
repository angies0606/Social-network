import classes from "./ImageUrlPreview.module.scss";
import classNames from "classnames";
import DeleteImage from "@ui-kit/DeleteImage/DeleteImage";

function ImageUrlPreview ({
  imageUrl = '',
  className = '',
  onDeleteImage = null,
  isDeleteShown = false,
  imageClassName = null
}) {
  if (!imageUrl) {
    return null;
  }

  let imagePreview = <img src={imageUrl} className={classNames(classes.ImagePreview__Image, imageClassName)}/>
  return (
    <>
      <div className={classNames(classes.ImagePreview, className)}>
        {isDeleteShown ? 
          <DeleteImage 
            className={classes.ImagePreview__DeleteImage}
            onDeleteImage={onDeleteImage}
          >
            {imagePreview}
          </DeleteImage>
          : 
          <div className={classes.ImagePreview}>
            {imagePreview}
          </div>
        }
      </div>
    </>
  )
}

export default ImageUrlPreview;