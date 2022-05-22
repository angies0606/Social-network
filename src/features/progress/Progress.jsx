import LinearProgress from '@mui/material/LinearProgress';
import classes from './Progress.module.css';
import {ProgressContext} from './progress.context';
import {useProgress} from './useProgress';

function Progress({children}) {
  const progress = useProgress();
  
  return (
    <>
      <ProgressContext.Provider value={progress}>
        {
          progress.isProgress &&
          <LinearProgress
            className={classes.Progress__Bar}
            variant="indeterminate"
            color='warning'
          />
        }
        {children}
      </ProgressContext.Provider>
    </>
  )
}

export default Progress;