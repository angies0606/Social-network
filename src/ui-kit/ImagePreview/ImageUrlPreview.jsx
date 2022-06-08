import classes from "./ImagePreview.module.scss";
import classNames from "classnames";
import DeleteImage from "@ui-kit/DeleteImage/DeleteImage";
import {useEffect, useState} from "react";

function ImageUrlPreview ({
  imageUrl = '',
  className = '',
  deleteImage = null,
  // isImageInfoShown = false,
  isDeleteShown = false,
  isPostImage = false
}) {
  // const [imageData, setImageData] = useState(null);

  // useEffect(() => {
  //   if(editingImageUrl) {
  //     setImageData(editingImageUrl);
  //   }
  // }, [editingImageUrl])
  
  // useEffect(() => {
  //   if(image) {
  //     const imageUrl = window.URL.createObjectURL(image);
  //     setImageData(imageUrl);
  //   }
  // }, [image])

  if (!imageUrl) {
    return null;
  }

  // const onDeleteImage = () => {
  //   deleteImage()
  // }
  
  // const imageUrl = window.URL.createObjectURL(image);

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