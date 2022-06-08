import IconButton from "@ui-kit/IconButton/IconButton";
import classNames from "classnames";
import { XCircleFill } from "react-bootstrap-icons";
import classes from "./DeleteImage.module.scss"
import {Children, cloneElement} from "react";


function DeleteImage ({
  children,
  className = '',
  deleteImage
}) {
  
  const onClick = () => {
    deleteImage()
  }
  return (
    <>
      <div className={classNames(classes.DeleteImage__OuterContainer, className)}>
        <div className={classNames(classes.DeleteImage__ImageBox)}>
          {Children.map(children, (child) => { 
            return cloneElement(child, {
              className: classNames(child.props.className, classes.DeleteImage__Image)
            });
          })}
          <IconButton className={classes.DeleteImage__XButton} onClick={onClick}>
            <XCircleFill />
          </IconButton>
        </div>
      </div> 
    </>
  )
}

export default DeleteImage;