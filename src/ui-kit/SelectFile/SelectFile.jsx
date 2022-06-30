import classes from "./SelectFile.module.scss";
import { useMemo, cloneElement, useRef, useCallback } from "react";

function SelectFile ({
  children,
  onFileSelect = null,
  isDisabled = false,
  post = null
}) {
  const inputRef = useRef();

  const onChange = (e) => {
    const file = inputRef?.current?.files[0];
    onFileSelect?.(file);
    e.target.value = null;
  };

  const onButtonClick = (e) => {
    inputRef?.current?.click();
  };

  const buttonClone = useMemo(() => {
    if(!children) {
      return;
    }
    return cloneElement(children, {
      onClick: (e) => {
        children.props?.onClick?.(e);
        if(!post) {
          onButtonClick(e);
        }
      },
      disabled: isDisabled
    });
  }, [children, isDisabled]);

  return (
    <>
      <input 
        ref={inputRef}
        type='file'
        accept='.jpg, .jpeg, .png'
        onChange={onChange}
        className={classes.SelectFile__Input}
      />
      {buttonClone}
    </>
  )
}

export default SelectFile;