import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
import moment from "moment";
import "moment/locale/he";
import rootStores from "../../Stores/Main";
import { observer } from "mobx-react";
// import ShowMeetingDetails from "../ShowMeetingDetails/ShowMeetingDetails";
import ViewMeetingsHistory from "../ViewMeetingHistory/ViewMeetingHistory";
const booking_icon = require("../../Assets/Images/booking_icon.png");
const no_bookings = require("../../Assets/Images/no_bookings.png");
moment().format();
moment.locale("he");

const bookingStore = rootStores.BOOKINGS_STORE;
// const userStore = rootStores.USERS_STORE;

const Bookings = ({ timeOfBookings }) => {
  const {
    getAllBookings,
    // getAllBookingsByUser,
    bookings,
    setCurrentBooking,
    currentBooking,
  } = bookingStore;
  // const { getUserDetails } = bookingStore;

  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showMeetingHistory, setShowMeetingHistory] = useState(false);
  let end;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getAllBookings();
      setIsLoading(false);
    };
    fetchData();
  }, [getAllBookings]);

  // useEffect(() => {
  //   async function getUnits() {
  //     const res = await getUserDetails();
  //     await getAllBookingsByUser(res._id)
  //     return;
  //   }
  //   getUnits();
  // }, []);
  useEffect(() => {
    // console.log("book", bookings);
  }, [bookings, end]);

  if (timeOfBookings === "future") {
    end = 3;
  } else {
    end = 4;
  }

  const filteredMeetings = useMemo(() => {
    let filteredData = [];
    if (timeOfBookings === "future") {
      filteredData = bookings.filter((book) => {
        const filter = moment().isSameOrBefore(book.startMeeting);
        return filter;
      });
    } else {
      filteredData = bookings.filter((book) => {
        const filter = moment().isSameOrAfter(book.startMeeting);
        return filter;
      });
    }
    return filteredData.slice(0, end);
  }, [bookings, timeOfBookings, end]);

  const openPopup = (meeting) => {
    setCurrentBooking(meeting);
    setShowPopup(true);
    navigate("/meeting")
  };

  console.log("current", JSON.parse(JSON.stringify(currentBooking)));

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  const viewMeetingHistory = () => {
    setShowMeetingHistory(true);
  };

  const unviewMeetingHistory = () => {
    setShowMeetingHistory(false);
  };

  console.log(JSON.parse(JSON.stringify(bookings)));

  return (
    <>
      {/* {showPopup && <ShowMeetingDetails onClose={closePopup} />} */}
      {showMeetingHistory && (
        <ViewMeetingsHistory data={bookings} onClose={unviewMeetingHistory} />
      )}
      <div className={`${timeOfBookings} user-meetings`}>
        {isLoading ? (
          <div>...טוען</div>
        ) : filteredMeetings.length > 0 ? (
          <div className="container-meetings">
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
                    {moment(meeting.startMeeting).format(
                      "dddd, D [ב]MMMM YYYY"
                    )}
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
            {end <= filteredMeetings.length ? (
              <div className="show-all">
                <span
                  onClick={() => {
                    viewMeetingHistory();
                  }}
                >
                  {"הצג הכול"}
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className="no-bookings-yet">
            <img
              src={no_bookings}
              alt="no-meetings"
              className="icon-no-bookings"
            />
            <p> כאן יופיעו הפגישות שלך </p>
          </div>
        )}
      </div>
    </>
  );
};

const BookingsObserver = observer(Bookings);
export default BookingsObserver;
