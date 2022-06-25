import classes from './Menu.module.scss';
import { useState, Children, cloneElement, useCallback, useEffect } from "react";
import MuiMenu from "@mui/material/Menu";
import IconButton from "@ui-kit/IconButton/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Menu({
  children,
  changeMode
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuInProgress, setIsMenuInProgress] = useState(false);
  //TODO: можно ли переписать на общий прогресс?
  useEffect(() => {
    if(changeMode) {
      startProgress();
    }
    else endProgress();
  },[changeMode])

  const startProgress = useCallback(() => {
    setIsMenuInProgress(true);
  }, [setIsMenuInProgress]);

  const endProgress = useCallback(() => {
    setIsMenuInProgress(false);
  }, [setIsMenuInProgress]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    startProgress();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if(!changeMode) {
      endProgress()
    }
  };

  const isDisabled = () => {
    return isMenuInProgress;
  };

  return (
    <div>
      <IconButton
        id='basic-button'
        onClick={handleClick}
        disabled={isDisabled()}
      >
        <MoreVertIcon className={classes.Menu__IconButton}/>
      </IconButton>
      <MuiMenu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Children.map(children, (child) => {
          //переопределяем у каждого child пропс onClick и добавляем обработку закрытия меню
          return cloneElement(child, {
            onClick: () => {
              child.props.onClick?.();
              handleClose();
            }
          });
        })}
      </MuiMenu>
    </div>
  )
}

export default Menu;