
import { styled } from "@mui/material/styles";
import IconButton from "@ui-kit/IconButton/IconButton";

  const Expander = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default Expander;
