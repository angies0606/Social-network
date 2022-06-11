import MUIDialog from "@mui/material/Dialog";
import MUIDialogActions from "@mui/material/DialogActions";
import MUIDialogContent from "@mui/material/DialogContent";
import MUIDialogTitle from "@mui/material/DialogTitle";
import Button from "@ui-kit/Button/Button";

function Dialog ({
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
      >
        <MUIDialogTitle>
          {title}
        </MUIDialogTitle>
        <MUIDialogContent>
          {message}
        </MUIDialogContent>
        <MUIDialogActions>
          <Button 
            onClick={onConfirm}
            disabled={isProgress}
          >
            Подтвердить
          </Button>
          <Button 
            onClick={onCancel}
            disabled={isProgress}
          >
            Отмена
          </Button>
        </MUIDialogActions>
      </MUIDialog>
    </div>
  )
}

export default Dialog;