import classes from "./Settings.module.scss";
import { useState } from "react";
import { usersApi } from '@api/api';
import { useProgressContext } from "@features/progress/progress.context";
import { useAuthContext } from "@features/auth/auth.context";
import Avatar from "@ui-kit/Avatar/Avatar";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageChanger from "@ui-kit/ImageChanger/ImageChanger";
import ConfirmDialog from "@ui-kit/ConfirmDialog/ConfirmDialog.jsx";
import DefaultBanner from "@assets/images/defaultBanner.jpg";

const TITLES = {
  AVATAR: ['Изменить аватар'],
  BANNER: ['Изменить баннер']
};

const Settings = ({
  authedUser,
  userProfileId,
  changeProfileImage
}) => {
  //TODO: сделать стили в Настройках
  const {changeUserData} = useAuthContext();
  const {isProgress} = useProgressContext();
  const [isAvatarDialogOpened, setIsAvatarDialogOpened] = useState(false);
  const [isBannerDialogOpened, setIsBannerDialogOpened] = useState(false);

  const isTheSameUser = authedUser._id === userProfileId;

  const onBannerChange = (formData) => {
    return usersApi.changeUserBanner(formData)
      .then(user => {
        onChangeUserImages(user);
      })
  };

  const onAvatarChange = (formData) => {
    return usersApi.changeUserAvatar(formData)
    .then(user => {
      onChangeUserImages(user);
    })
  };

  const onChangeUserImages = (data) => {
    changeUserData(data);
    if(isTheSameUser) {
      changeProfileImage(data);
    }
  };

  const onBannerDeleteConfirm = () => {
    return usersApi.deleteUserBanner(authedUser.banner)
    .then(user => {
      onChangeUserImages(user);
      setIsBannerDialogOpened(false);
    })
  };

  const onAvatarDeleteConfirm = () => {
    return usersApi.deleteUserAvatar(authedUser.avatar)
    .then(user => {
      onChangeUserImages(user);
      setIsAvatarDialogOpened(false);
    })
  };

  return (
    <div className={classes.Settings__Container}>
      <div className={classes.Settings__Header}>
        Изменить аватар 
      </div>
      <div className={classes.Settings__Avatar}>
        <Avatar
          // className={classes.ProfileInfo__Avatar}
          userAvatar={authedUser.avatar}
          avatarHeight={150}
          avatarWidth={150}
        />
      </div>
      <div className={classes.Settings__ButtonBox}>
        <ImageChanger
          title={TITLES.AVATAR}
          onImageChange={onAvatarChange}
          isProgress={isProgress}
        >
          <Button 
            startIcon={<AddPhotoAlternateIcon />}
            disabled={isProgress}
            color='success'
            variant='outlined'
            className={classes.Settings__Button}
          >
            Изменить
          </Button>
        </ImageChanger>
        {authedUser.avatar && 
          <Button 
            disabled={isProgress}
            onClick={() => setIsAvatarDialogOpened(true)}
            color='success'
            variant='outlined'
            className={classes.Settings__DeleteButton}
          >
            Удалить
          </Button>
        }
      </div>
      <div className={classes.Settings__Header}>
        Изменить баннер
      </div>
      <div className={classes.Settings__BannerBox}>
        <img 
          className={classes.Settings__Banner}
          src={authedUser.banner || DefaultBanner} 
        />
      </div>
      <div className={classes.Settings__ButtonBox}>
        <ImageChanger
          title={TITLES.BANNER}
          onImageChange={onBannerChange}
          isProgress={isProgress}
        >
          <Button 
            startIcon={<AddPhotoAlternateIcon />}
            disabled={isProgress}
            color='success'
            variant='outlined'
            className={classes.Settings__Button}
          >
            Изменить
          </Button>
        </ImageChanger>
        {authedUser.banner && 
          <Button 
            disabled={isProgress}
            onClick={() => setIsBannerDialogOpened(true)}
            color='success'
            variant='outlined'
            className={classes.Settings__DeleteButton}
          >
            Удалить
          </Button>
        }
      </div>
      <ConfirmDialog
        isShown={isAvatarDialogOpened}
        title={"Удаление аватара"}
        message={"Вы действительно хотите удалить аватар?"}
        isProgress={isProgress}
        onCancel={() => {setIsAvatarDialogOpened(false)}}
        onConfirm={onAvatarDeleteConfirm}
      />
      <ConfirmDialog
        isShown={isBannerDialogOpened}
        title={"Удаление баннера"}
        message={"Вы действительно хотите удалить баннер?"}
        isProgress={isProgress}
        onCancel={() => {setIsBannerDialogOpened(false)}}
        onConfirm={onBannerDeleteConfirm}
      />
    </div>
  )
}

export default Settings;