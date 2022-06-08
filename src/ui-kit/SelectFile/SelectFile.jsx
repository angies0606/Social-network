import {useMemo, cloneElement, useRef, useState, useCallback, useEffect} from 'react';
import classes from './SelectFile.module.scss';


function SelectFile ({
  children,
  onFileSelect = null,
  isDisabled = false,
  isImageInPost = false,
  post = null
}) {
  // const [isProgress, setIsProgress] = useState(false);
  
  // useEffect(() => {
  //   if(!postCreatorProgress) {
  //     endProgress();
  //   }
  // }, [postCreatorProgress])

  // const startProgress = useCallback(() => {
  //   setIsProgress(true);
  // }, [setIsProgress]);

  // const endProgress = useCallback(() => {
  //   setIsProgress(false);
  // }, [setIsProgress]);

  const inputRef = useRef();

  const onChange = (e) => {
    const file = inputRef?.current?.files[0];
    onFileSelect?.(file);
    e.target.value = null;
  }

  const onButtonClick = (e) => {
    inputRef?.current?.click();
  }

  const buttonClone = useMemo(() => {
    if(!children) {
      return;
    }
    return cloneElement(children, {
      // className: classNames(textField.props.className, classes.PostCreator__TextField),
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
        accept=".jpg, .jpeg, .png"
        onChange={onChange}
        className={classes.SelectFile__Input}
      ></input>
      {buttonClone}
    </>
  )
}

export default SelectFile;