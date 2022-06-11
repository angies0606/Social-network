import "@assets/styles/preloader.css";
import classes from "./App.module.css";
import Auth from "@features/auth/Auth";
import Progress from "@features/progress/Progress";
import AppRouting from "@components/AppRouting/AppRouting";
import Navbar from "../Navbar/Navbar";
import Header from "@components/Header/Header";

function App () {
  return (
    <Auth>
    <Progress>
      <div className={classes.App__Container}>
        <div className={classes.App_Content}>
          <AppRouting />
        </div>
        <Header />
        <Navbar />
      </div>
    </Progress>
    </Auth>
  )
}

export default App;