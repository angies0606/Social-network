import classes from "./InfoDialog.module.scss";
import MUIDialog from "@mui/material/Dialog";
import MUIDialogActions from "@mui/material/DialogActions";
import MUIDialogContent from "@mui/material/DialogContent";
import MUIDialogTitle from "@mui/material/DialogTitle";
import Button from "@ui-kit/Button/Button";

function InfoDialog ({
  isShown,
  title,
  isProgress,
  onClose,
  message
}) {
  return (
    <div>
      <MUIDialog
        open={isShown}
        onClose={onClose}
        className={classes.InfoDialog__Container}
      >
        <MUIDialogTitle className={classes.InfoDialog__Title}>
          {title}
        </MUIDialogTitle>
        <MUIDialogContent className={classes.InfoDialog__Content}>
          {message}
        </MUIDialogContent>
        <MUIDialogActions className={classes.InfoDialog__ButtonContainer}>
          <Button 
            onClick={onClose}
            disabled={isProgress}
            className={classes.InfoDialog__Button}
            color='success'
          >
            Oк
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  )
}

export default InfoDialog;