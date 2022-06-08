import {useState} from "react";
import Avatar from "@ui-kit/Avatar/Avatar";
import Button from "@ui-kit/Button/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useProgressContext } from "@features/progress/progress.context";
import classes from "./Settings.module.scss";
import { imagesApi, usersApi } from '@api/api-n';
import { useAuthContext } from "@features/auth/auth.context";
import ImageChanger from "@ui-kit/ImageChanger/ImageChanger";
import Dialog from "ui-kit/Dialog/Dialog.jsx";

const TITLES = {
  AVATAR: 'Изменить аватар',
  BANNER: 'Изменить баннер'
}

const defaultBanner = "http://localhost:8080/images/629f63fd77541380b6d7935e/25738.jpg";

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

  const onBannerDeleteConfirm = () => {
    return usersApi.deleteUserBanner(authedUser.banner)
    .then(user => {
      onChangeUserImages(user);
      setIsBannerDialogOpened(false);
    })
  }

  const onAvatarDeleteConfirm = () => {
    return usersApi.deleteUserAvatar(authedUser.avatar)
    .then(user => {
      onChangeUserImages(user);
      setIsAvatarDialogOpened(false);
    })
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
      {authedUser.avatar && 
      <Button 
        disabled={isProgress}
        onClick={() => setIsAvatarDialogOpened(true)}
      >
        Удалить
      </Button>}
      <div>
        Изменить баннер
      </div>
      <div className={classes.Settings__BannerBox}>
        <img 
          className={classes.Settings__Banner}
          src={authedUser.banner || defaultBanner} 
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
      {authedUser.banner && 
        <Button 
        disabled={isProgress}
        onClick={() => setIsBannerDialogOpened(true)}
      >
        Удалить
      </Button>
      }
      <Dialog
        isShown={isAvatarDialogOpened}
        title={"Удаление аватара"}
        message={"Вы действительно хотите удалить аватар?"}
        isProgress={isProgress}
        onCancel={() => {setIsAvatarDialogOpened(false)}}
        onConfirm={onAvatarDeleteConfirm}
      />
      <Dialog
        isShown={isBannerDialogOpened}
        title={"Удаление баннера"}
        message={"Вы действительно хотите удалить баннер?"}
        isProgress={isProgress}
        onCancel={() => {setIsBannerDialogOpened(false)}}
        onConfirm={onBannerDeleteConfirm}
      />
    </>
  )
}

export default Settings;