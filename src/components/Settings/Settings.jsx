import classes from "./Settings.module.scss";
import { useState } from "react";
import { usersApi } from '@api/api';
import { useAuthContext } from "@features/auth/auth.context";
import { useProgress } from "@features/progress/useProgress.js";
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
  const {changeUserData} = useAuthContext();
  const {increment: incrementAvatarProgress, decrement: decrementAvatarProgress, isProgress: isAvatarProgress} = useProgress();
  const {increment: incrementBannerProgress, decrement: decrementBannerProgress, isProgress: isBannerProgress} = useProgress();
  const [isAvatarDialogOpened, setIsAvatarDialogOpened] = useState(false);
  const [isBannerDialogOpened, setIsBannerDialogOpened] = useState(false);

  const isTheSameUser = authedUser._id === userProfileId;

  const onBannerChange = (formData) => {
    incrementBannerProgress();
    return usersApi.changeUserBanner(formData)
      .then(user => {
        onChangeUserImages(user);
      })
      .finally(() => {
        decrementBannerProgress();
      })
  };

  const onAvatarChange = (formData) => {
    incrementAvatarProgress();
    return usersApi.changeUserAvatar(formData)
      .then(user => {
        onChangeUserImages(user);
      })
      .finally(() => {
        decrementAvatarProgress();
      })
  };

  const onChangeUserImages = (data) => {
    changeUserData(data);
    if(isTheSameUser) {
      changeProfileImage(data);
    }
  };

  const onBannerDeleteConfirm = () => {
    incrementBannerProgress();
    return usersApi.deleteUserBanner(authedUser.banner)
      .then(user => {
        onChangeUserImages(user);
        setIsBannerDialogOpened(false);
      })
      .finally(() => {
        decrementBannerProgress();
      })
  };

  const onAvatarDeleteConfirm = () => {
    incrementAvatarProgress();
    return usersApi.deleteUserAvatar(authedUser.avatar)
      .then(user => {
        onChangeUserImages(user);
        setIsAvatarDialogOpened(false);
      })
      .finally(() => {
        decrementAvatarProgress();
      })
  };

  return (
    <div className={classes.Settings__Container}>
      <div className={classes.Settings__Header}>
        Изменить аватар 
      </div>
      <div className={classes.Settings__Avatar}>
        <Avatar
          userAvatar={authedUser.avatar}
          avatarHeight={150}
          avatarWidth={150}
        />
      </div>
      <div className={classes.Settings__ButtonBox}>
        <ImageChanger
          title={TITLES.AVATAR}
          onImageChange={onAvatarChange}
          isProgress={isAvatarProgress}
        >
          <Button 
            startIcon={<AddPhotoAlternateIcon />}
            disabled={isAvatarProgress}
            color='success'
            variant='outlined'
            className={classes.Settings__Button}
          >
            Изменить
          </Button>
        </ImageChanger>
        {authedUser.avatar && 
          <Button 
            disabled={isAvatarProgress}
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
          isProgress={isBannerProgress}
        >
          <Button 
            startIcon={<AddPhotoAlternateIcon />}
            disabled={isBannerProgress}
            color='success'
            variant='outlined'
            className={classes.Settings__Button}
          >
            Изменить
          </Button>
        </ImageChanger>
        {authedUser.banner && 
          <Button 
            disabled={isBannerProgress}
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
        onCancel={() => {setIsAvatarDialogOpened(false)}}
        onConfirm={onAvatarDeleteConfirm}
      />
      <ConfirmDialog
        isShown={isBannerDialogOpened}
        title={"Удаление баннера"}
        message={"Вы действительно хотите удалить баннер?"}
        onCancel={() => {setIsBannerDialogOpened(false)}}
        onConfirm={onBannerDeleteConfirm}
      />
    </div>
  )
}

export default Settings;