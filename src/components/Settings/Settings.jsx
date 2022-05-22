import {useState} from "react";
import Avatar from "@ui-kit/Avatar/Avatar";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useProgressContext } from "@features/progress/progress.context";
import Dialog from "@ui-kit/Dialog/Dialog";
import classes from "./Settings.module.scss";
import { imagesApi, usersApi } from '@api/api-n';
import { useAuthContext } from "@features/auth/auth.context";
import ImageChanger from "@ui-kit/ImageChanger/ImageChanger";

const TITLES = {
  AVATAR: 'Изменить аватар',
  BANNER: 'Изменить баннер'
}

const Settings = ({
  authedUser,
  userProfileId,
  changeProfileImage
}) => {
  //TODO: сделать стили в Настройках
  const {changeUserData} = useAuthContext();
  const {isProgress} = useProgressContext();
  // const [isDialogOpened, setIsDialogOpened] = useState(false);

  const isTheSameUser = authedUser._id === userProfileId;

  const onBannerChange = (formData) => {
    return usersApi.changeUserBanner(formData, authedUser._id)
      .then(user => {
        onChangeUserImages(user);
       
      })
  }

  const onAvatarChange = (formData) => {
    return usersApi.changeUserAvatar(formData, authedUser._id)
    .then(user => {
      onChangeUserImages(user);
    })
  }

  const onChangeUserImages = (data) => {
    console.log(data);
    changeUserData(data);
    if(isTheSameUser) {
      changeProfileImage(data);
    }
  }

  return (
    <>
      <div>
        Изменить аватар 
      </div>
      <Avatar
        // className={classes.ProfileInfo__Avatar}
        userAvatar={authedUser.avatar}
        avatarHeight={150}
        avatarWidth={150}
      />
      <ImageChanger
        //  isDialogShown={isDialogOpened}
        title={TITLES.AVATAR}
        //  onImageConfirm={onImageConfirm}
        onImageChange={onAvatarChange}
        isProgress={isProgress}
      >
        <Button 
          startIcon={<AddPhotoAlternateIcon />}
          disabled={isProgress}
        >
          Изменить
        </Button>
      </ImageChanger>
   
      <div>
        Изменить баннер
      </div>
      <div className={classes.Settings__BannerBox}>
        <img 
          className={classes.Settings__Banner}
          src={authedUser.banner} 
        />
      </div>

      <ImageChanger
        //  isDialogShown={isDialogOpened}
        title={TITLES.BANNER}
        //  onImageConfirm={onImageConfirm}
        onImageChange={onBannerChange}
        isProgress={isProgress}
        >
        <Button 
          startIcon={<AddPhotoAlternateIcon />}
          disabled={isProgress}
          >
          Изменить
        </Button>
      </ImageChanger>
      {/* <div>
        <img src={user.banner} />
      </div> */}
      {/* <Dialog 
        isShown={isDialogOpened.show}
        item={isDialogOpened.item}
        closeDialog={() => setIsDialogOpened({ item: '', show: false})}
        onImageConfirm={onImageConfirm}
        isProgress={isProgress}
      /> */}
    </>
    
  )
}

export default Settings;