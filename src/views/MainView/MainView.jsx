import classes from "./MainView.module.css";

const MainView = () => {
  return (
    <div className={classes.wrapper}>
      <img src={'static/logo.png'} className={classes.titleImage} alt={"logo"} />
      <h1 className={classes.logoText}>Super Shop where AI helps you make decision</h1>
    </div>
  );
};

export default MainView;
