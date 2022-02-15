import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, Children, cloneElement, useCallback, useEffect } from 'react';
import IconButton from '@ui-kit/IconButton/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';



function Menu({
  children,
  changeMode
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  
  useEffect(() => {
    if(changeMode) {
      startProgress();
    }
    else endProgress();
  },[changeMode])
  const startProgress = useCallback(() => {
    setIsProgress(true);
  }, [setIsProgress]);

  const endProgress = useCallback(() => {
    setIsProgress(false);
  }, [setIsProgress]);

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
    return isProgress;
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        onClick={handleClick}
        disabled={isDisabled()}
      >
        <MoreVertIcon />
      </IconButton>
      <MuiMenu
        id="basic-menu"
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