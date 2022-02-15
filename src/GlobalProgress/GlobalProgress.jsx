import {useProgressContext} from '@contexts/progress.context.js';
import LinearProgress from '@mui/material/LinearProgress';
import classes from './GlobalProgress.module.css';

function GlobalProgress({

}) {
  const {isProgress} = useProgressContext();
  return (
    <>
      {
        isProgress &&
        <LinearProgress
          className={classes.GlobalProgress__Bar}
          variant="determinate"
          color='warning'
        />
      }
    </>
  )
}

export default GlobalProgress;