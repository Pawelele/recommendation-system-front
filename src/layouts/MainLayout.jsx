import MainNavigation from "../components/MainNavigation/MainNavigation";
import classes from "./MainLayout.module.css";
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

  return (
    <div className={classes.wrapper}>
      <div className={classes.nav}>
        <MainNavigation />
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
      <div className={classes.footer}>
        {/* <FooterComponent /> */}
      </div>
    </div>
  )
}

export default MainLayout;