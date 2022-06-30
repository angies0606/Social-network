import classes from './Menu.module.scss';
import { useState, Children, cloneElement, useCallback, useEffect } from "react";
import { useProgress } from "@features/progress/useProgress.js";
import MuiMenu from "@mui/material/Menu";
import IconButton from "@ui-kit/IconButton/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Menu({
  children,
  changeMode
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const {increment, decrement, isProgress} = useProgress();

  useEffect(() => {
    if(changeMode) {
      increment();
    }
    else decrement();
  },[changeMode])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    increment();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if(!changeMode) {
      decrement();
    }
  };

  const isDisabled = () => {
    return isProgress;
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