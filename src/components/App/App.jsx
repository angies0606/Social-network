import "@assets/styles/preloader.css";
import classes from "./App.module.css";
import Auth from "@features/auth/Auth";
import Progress from "@features/progress/Progress";
import AppRouting from "@features/AppRouting/AppRouting";
import Navbar from "../Navbar/Navbar";
import Header from "@components/Header/Header";
import ScrollProvider from '@features/scroll/ScrollProvider'

function App () {
  return (
    <Auth>
    <Progress>
      <div className={classes.App__Container}>
        <div className={classes.Header__Container}>
          <Header />
        </div>
        <div className={classes.App__ContentContainer}>
          <Navbar />
          <div className={classes.App__MainInfoContainer} id={classes.App__MainInfoContainer}>
            <ScrollProvider scrollableTargetId={classes.App__MainInfoContainer}>
              <AppRouting />
            </ScrollProvider>
          </div>
        </div>
      </div>
    </Progress>
    </Auth>
  )
}

export default App;