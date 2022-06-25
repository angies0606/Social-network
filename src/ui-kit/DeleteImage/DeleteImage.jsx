import classes from "./DeleteImage.module.scss"
import classNames from "classnames";
import { Children, cloneElement } from "react";
import IconButton from "@ui-kit/IconButton/IconButton";
import { XCircleFill } from "react-bootstrap-icons";

function DeleteImage ({
  children,
  className = '',
  onDeleteImage
}) {
  const onClick = () => {
    onDeleteImage?.();
  };

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