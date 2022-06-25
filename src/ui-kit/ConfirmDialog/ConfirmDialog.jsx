import classes from "./ConfirmDialog.module.scss";
import MUIDialog from "@mui/material/Dialog";
import MUIDialogActions from "@mui/material/DialogActions";
import MUIDialogContent from "@mui/material/DialogContent";
import MUIDialogTitle from "@mui/material/DialogTitle";
import Button from "@ui-kit/Button/Button";

function ConfirmDialog ({
  isShown,
  title,
  isProgress,
  onConfirm,
  onCancel,
  message
}) {
  return (
    <div>
      <MUIDialog
        open={isShown}
        onClose={onCancel}
        className={classes.ConfirmDialog__Container}
      >
        <MUIDialogTitle className={classes.ConfirmDialog__Title}>
          {title}
        </MUIDialogTitle>
        <MUIDialogContent className={classes.ConfirmDialog__Content}>
          {message}
        </MUIDialogContent>
        <MUIDialogActions className={classes.ConfirmDialog__ButtonContainer}>
          <Button 
            onClick={onConfirm}
            disabled={isProgress}
            color='success'
            className={classes.ConfirmDialog__Button}
          >
            Подтвердить
          </Button>
          <Button 
            onClick={onCancel}
            disabled={isProgress}
            color='success'
            className={classes.ConfirmDialog__Button}
          >
            Отмена
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  )
}

export default ConfirmDialog;