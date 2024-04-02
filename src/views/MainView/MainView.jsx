import classes from "./MainView.module.css";

const MainView = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Shop with many products</h1>
      <p>Buy here to get the best recomendations</p>
      {/* <IssueForm /> */}
    </div>
  )
}

export default MainView;