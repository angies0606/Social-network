import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, Children, cloneElement } from 'react';
import IconButton from '@ui-kit/IconButton/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';



function Menu({
  children
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        onClick={handleClick}
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