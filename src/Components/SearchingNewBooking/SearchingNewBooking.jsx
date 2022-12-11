import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchLoader from "../ui/SearchLoader/SearchLoader";
import classes from "./SearchingNewBooking.module.css";

const binocular = require("../../Assets/Images/binocular.png");

export default function SearchingNewBooking() {
  const navigate = useNavigate();

  return (
    <div className={classes.SearchingNewBookingContainer}>
      <h2 className={classes.searchingHeadline}>מחפשים לך</h2>
      <img src={binocular} alt="binocular_icon" className={classes.binocular} />
      <SearchLoader />
      {useEffect(() => {
        const goToResults = () => {
          navigate("/search-results");
        };
        const timer = setTimeout(() => goToResults(), 3000);
        return () => clearTimeout(timer);
      }, [navigate])}
    </div>
  );
}
