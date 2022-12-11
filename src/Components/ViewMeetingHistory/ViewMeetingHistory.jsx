import "./ViewMeetingHistory.css";
import { observer } from "mobx-react";
import { useState, useMemo } from "react";
import moment from "moment";
import "moment/locale/he";
import ShowMeetingDetails from "../ShowMeetingDetails/ShowMeetingDetails";
import rootStores from "../../Stores/Main";
import BackArrow from "../Header/BackArrow/BackArrow";

const bookingStore = rootStores.BOOKINGS_STORE;

const booking_icon = require("../../Assets/Images/booking_icon.png");

moment().format();
moment.locale("he");

const ViewMeetingHistory = ({ data, onClose }) => {
  const { setCurrentBooking } = bookingStore;
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (meeting) => {
    console.log("pop up is open");
    console.log("meet", meeting.startMeeting);
    setCurrentBooking(meeting);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredMeetings = useMemo(() => {
    let filteredData = [];
    filteredData = data.filter((book) => {
      const filter = moment().isSameOrAfter(book.startMeeting);
      return filter;
    });

    return filteredData;
  }, [data]);

  return (
    <>
      {showPopup && <ShowMeetingDetails onClose={closePopup} />}
      <div className="view-meeting-history-container">
        <BackArrow text={"פגישות שהיו"} onClick={onClose} />
        <div className="view-all-meetings">
          {filteredMeetings.map((meeting) => (
            <div
              className="detailsOfMeeting"
              onClick={() => openPopup(meeting)}
            >
              <div>
                <img src={booking_icon} alt="icon" className="booking-icon" />
              </div>
              <div className="details-timeAndDate">
                <div className="dayAndDate">
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
      </div>
    </>
  );
};

const ViewMeetingsHistory = observer(ViewMeetingHistory);
export default ViewMeetingsHistory;
