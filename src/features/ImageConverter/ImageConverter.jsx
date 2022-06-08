import ImagePreview from "@ui-kit/ImagePreview/ImageFilePreview";
import {Children, cloneElement, useEffect, useState} from "react";

function ImageConvertor ({
  imageData,
  children
}) {

  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    if(imageData) {
      if(typeof imageData === 'object') {
        const url = window.URL.createObjectURL(imageData);
        setImageUrl(url);
        setImageFile(imageData)
    }
      if(typeof imageData === 'string') {
        setImageUrl(imageData);
      }
    }
  
  }, [imageData])

  if(!imageData) {
    return null;
  }
  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          imageUrl,
          imageFile
        });
      })}
    </>
  )
}

export default ImageConvertor;