import classes from "./Alternatives.module.css";
import SummaryMeetingDetails from "../../SummaryMeetingDetails/SummaryMeetingDetails";
import rootStores from "../../../Stores/Main";
const bookingStore = rootStores.BOOKINGS_STORE;
const magnifier = require("../../../Assets/Images/magnifier.png");

export default function Alternatives() {
  const { bookings } = bookingStore;
  const meetingsArray = bookings;
  return (
    <div>
      <h3 className={classes.headLine}>לא מצאנו את מה שרצית</h3>
      <img
        src={magnifier}
        alt="magnifier_icon"
        className={classes.magnifierIcon}
      />
      <p className={classes.par}>,אבל הי</p>
      <p className={classes.parBold}>יש לנו כמה אופציות אחרות בשבילך</p>
      <SummaryMeetingDetails
        meetingsArray={meetingsArray}
        alternativesPage={true}
      />
    </div>
  );
}
