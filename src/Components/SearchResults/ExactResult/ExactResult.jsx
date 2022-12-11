import { useNavigate } from "react-router-dom";
import classes from "./ExactResult.module.css";
import Buttons from "../../Button/Button";
import MeetingDetails from "../../MeetingDetails/MeetingDetails";

const searchResult = require("../../../Assets/Images/search_result.png");

export default function ExactResult() {
  const nevigate = useNavigate();
  const MakeAReservation = () => {
    nevigate("/home");
  };
  const CancelReservation = () => {
    nevigate("/home");
  };
  return (
    <div className={classes.exactResult}>
      <img
        src={searchResult}
        alt="search_result_icon"
        className={classes.searchResultIcon}
      />
      <h2 className={classes.headLine}>מצאנו את מה שחיפשת</h2>
      <MeetingDetails />
      <div className={classes.roomCost}>
        (calculate cost function result)={">"}
        {"{ }"}
      </div>
      <div className={classes.footerButtons}>
        <Buttons
          text1={"בטח"}
          text2={"בעצם לא"}
          happend={MakeAReservation}
          close={CancelReservation}
        />
      </div>
    </div>
  );
}
