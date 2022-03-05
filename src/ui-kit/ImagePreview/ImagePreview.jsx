import classes from './ImagePreview.module.scss';
import classNames from 'classnames';

function ImagePreview ({
  image,
  className = ''
}) {
  if (!image) {
    return null;
  }

  const imageUrl = window.URL.createObjectURL(image);

  return (
    <>
      <div className={classNames(className, classes.ImagePreview)}>
        <img src={imageUrl} className={classes.ImagePreview__Image}/>
        <div className={classes.ImagePreview__Text}>
          {image.name} ({image.size} b)
        </div>
      </div>
    </>
  )
}

export default ImagePreview;