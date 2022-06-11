import classes from "./Progress.module.css";
import { useProgress } from "./useProgress";
import { ProgressContext } from "./progress.context";
import LinearProgress from "@mui/material/LinearProgress";

function Progress({children}) {
  const progress = useProgress();
  
  return (
    <>
      <ProgressContext.Provider value={progress}>
        {
          progress.isProgress &&
          <LinearProgress
            className={classes.Progress__Bar}
            variant='indeterminate'
            color='warning'
          />
        }
        {children}
      </ProgressContext.Provider>
    </>
  )
}

export default Progress;