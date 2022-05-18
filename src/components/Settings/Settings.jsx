import {useState} from "react";
import Avatar from "@ui-kit/Avatar/Avatar";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useProgressContext } from "@features/progress/progress.context";
import Dialog from "@ui-kit/Dialog/Dialog";
import classes from "./Settings.module.scss";

const avatar = 'аватар';
const banner = 'баннер';

const Settings = ({
  user
}) => {
  //TODO: сделать стили в Настройках
  const {isProgress} = useProgressContext();
  const [isDialogOpened, setIsDialogOpened] = useState({ item: '', show: false});

  const onButtonClick = (item) => {
    setIsDialogOpened({ item, show: true});
  }
 
  return (
    <>
    <div>
      Изменить аватар 
    </div>
    <Avatar
        // className={classes.ProfileInfo__Avatar}
        userAvatar={user.avatar}
        avatarHeight={150}
        avatarWidth={150}
      />
    <Button 
      startIcon={<AddPhotoAlternateIcon />}
      onClick={() => {onButtonClick(avatar)}}
    >
      Изменить
    </Button>
    <div>
      Изменить баннер
    </div>
    <div className={classes.Settings__BannerBox}>
      <img 
        className={classes.Settings__Banner}
        src={user.banner} 
      />
    </div>
    
    <Button 
      startIcon={<AddPhotoAlternateIcon />}
      onClick={() => {onButtonClick(banner)}}
    >
      Изменить
    </Button>
    {/* <div>
      <img src={user.banner} />
    </div> */}
    <Dialog 
      isShown={isDialogOpened.show}
      item={isDialogOpened.item}
      closeDialog={() => setIsDialogOpened({ item: '', show: false})}
    />
    </>
  )
}

export default Settings;