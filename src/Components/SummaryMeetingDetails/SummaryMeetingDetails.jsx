import { Fragment, useState } from "react";
import moment from "moment";
import "moment/locale/he";

import classes from "./SummarMeetingDetails.module.css";
import rootStores from "../../Stores/Main";
import ShowMeetingDetails from "../ShowMeetingDetails/ShowMeetingDetails";
const booking_icon = require("../../Assets/Images/booking_icon.png");
const pre_booking_icon = require("../../Assets/Images/pre_booking_icon.png");

const bookingStore = rootStores.BOOKINGS_STORE;

export default function SummaryMeetingDetails(props) {
  const { alternativesPage, meetingsArray } = props;
  const [showPopup, setShowPopup] = useState(false);
  const { setCurrentBooking } = bookingStore;

  const openPopup = (meeting) => {
    setCurrentBooking(meeting);

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Fragment>
      {showPopup && <ShowMeetingDetails onClose={closePopup} />}
      <div className={classes.viewAllMeetings}>
        {meetingsArray.map((meeting) => (
          <div
            className={classes.detailsOfMeeting}
            onClick={() => openPopup(meeting)}
            key={meeting._id}
          >
            {alternativesPage ? (
              <div>
                <img
                  src={pre_booking_icon}
                  alt="icon"
                  className="pre_booking-icon"
                />
              </div>
            ) : (
              <div>
                <img src={booking_icon} alt="icon" className="booking-icon" />
              </div>
            )}
            <div className={classes.detailsTimeAndDate}>
              <div className={classes.dayAndDate}>
                {moment(meeting.startMeeting).format("dddd, D [ב]MMMM YYYY")}
              </div>
              <div>
                {" "}
                {moment(meeting.startMeeting).format("LT")}-{" "}
                {moment(meeting.endMeeting).format("LT")}
                {"  "} בחדר {`'${meeting.roomId.name}'`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
