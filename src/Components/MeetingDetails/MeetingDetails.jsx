import "./MeetingDetails.css";
import rootStores from "../../Stores/Main";

import moment from "moment";
import "moment/locale/he";

moment().format();
moment.locale("he");

const bookingStore = rootStores.BOOKINGS_STORE;

export default function MeetingDetails() {
  const { currentBooking } = bookingStore;

  const mokMeeting = {
    startMeeting: "2022-05-26T08:08:49.365+00:00",
    endMeeting: "2022-05-26T08:08:52.365+00:00",
    roomId: {
      name: "קליקה",
      picture:
        "https://www.srugim.co.il/i/wp-content/uploads/2017/07/%D7%9F8%D7%9F%D7%9D__w650h331q80.png",
      maxOfPeople: 5,
    },
  };

  return (
    <>
      <div className="meeting_details_container">
        <div className="img_and_details">
          <img
            className="room_img"
            src={currentBooking.roomId?.picture}
            alt="room"
          />
        </div>
        <div className="meeting-details">
          <div className="room_details">
            <div className="room_name"> חדר {currentBooking.roomId?.name} </div>
            <div className="room_max_people">
              {" "}
              מתאים ל {mokMeeting.roomId.maxOfPeople} משתתפים
            </div>
          </div>
          <div className="text_meeting_1">
            <p className="date-of-meet">
              {" "}
              יום {moment(currentBooking.startMeeting).format("dddd DD/MM/YY")}
            </p>
          </div>
          <div className="text_meeting_2">
            בשעה {moment(currentBooking.startMeeting).format("LT")}-
            {moment(currentBooking.endMeeting).format("LT")}
          </div>
        </div>
        <div className="bottom-line"></div>
      </div>
    </>
  );
}
