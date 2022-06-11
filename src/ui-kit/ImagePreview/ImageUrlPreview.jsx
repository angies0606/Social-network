import classes from "./ImagePreview.module.scss";
import classNames from "classnames";
import DeleteImage from "@ui-kit/DeleteImage/DeleteImage";

function ImageUrlPreview ({
  imageUrl = '',
  className = '',
  deleteImage = null,
  isDeleteShown = false,
  isPostImage = false
}) {
  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <div className={classNames(classes.ImagePreview, className)}>
        {isDeleteShown? 
          <DeleteImage 
            className={classes.ImagePreview__DeleteImage}
            deleteImage={deleteImage}
          >
            <img src={imageUrl} className={classNames(classes.ImagePreview__Image, {
              [classes['ImagePreview__Image--post']]: isPostImage
            })}/>
          </DeleteImage>
          : <div className={classes.ImagePreview}>
              <img src={imageUrl} className={classNames(classes.ImagePreview__Image, {
                [classes['ImagePreview__Image--post']]: isPostImage
              })}/>
            </div>
        }
       {/* {isImageInfoShown && 
          <div className={classes.ImagePreview__Text}>
            {imageFile.name} ({imageFile.size} b)
          </div>
       } */}
      </div>
    </>
  )
}

export default ImageUrlPreview;