import MuiButton from "@mui/material/Button";

function Button (props) {
  return (
    <MuiButton
      {...props}
      sx={{fontSize: 12}}
      color='success'
    />
  )
}
export default Button;