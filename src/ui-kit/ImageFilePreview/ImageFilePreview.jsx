import classes from "./ImageFilePreview.module.scss";
import ImageUrlPreview from "@ui-kit/ImageUrlPreview/ImageUrlPreview";

function ImageFilePreview ({
  imageFile = null,
  className = '',
  onDeleteImage = null,
  isDeleteShown = false,
  imageClassName = null
}) {
  if (!imageFile) {
    return null;
  }

  const imageUrl = window.URL.createObjectURL(imageFile);

  return (
    <>
      <ImageUrlPreview 
        className={className}
        onDeleteImage={onDeleteImage}
        isDeleteShown={isDeleteShown}
        imageUrl={imageUrl}
        imageClassName={imageClassName}
      />
      <div className={classes.ImagePreview__Text}>
        {imageFile.name} ({imageFile.size} b)
      </div>
    </>
  )
}

export default ImageFilePreview;