import classes from "./SearchLoader.module.css";
export default function SearchLoader() {
  return (
    <div className={classes.dotsLoaderContainer}>
      <div className={classes.dot1}> </div>
      <div className={classes.dot2}></div>
      <div className={classes.dot3}></div>
    </div>
  );
}
