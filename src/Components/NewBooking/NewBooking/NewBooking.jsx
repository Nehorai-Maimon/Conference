import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

import "./NewBooking.css";
import rootStores from "../../../Stores/Main";
import NewBookingPickRoom from "../NewBookingPickRoom/NewBookingPickRoom";
import NewBookingPickDate from "../NewBookingPickDate/NewBookingPickDate";
import NewBookingPickHour from "../NewBookingPickHour/NewBookingPickHour";
import BookingDetails from "./BookingDetails";
import SearchingNewBooking from "../../SearchingNewBooking/SearchingNewBooking";
import BackArrow from "../../Header/BackArrow/BackArrow";
import Button from "../../Button/Button";

const bookingStore = rootStores.BOOKINGS_STORE;
const PAGE_NAME = {
  date: 1,
  time: 2,
  details: 3,
  searching: 4,
};
const SearchMeeting = () => {
  const {
    newBooking,
    setStartDate,
    setStartHour,
    getAllRooms,
    setEndHour,
    setPickedRoom,
  } = bookingStore;
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const getRooms = async () => {
      const response = await getAllRooms();
      const roomsOptions = response.map((room) => {
        return { label: room.name, value: room._id };
      });
      setRooms(roomsOptions);
    };

    try {
      getRooms();
    } catch (err) {
      console.log(err);
    }
  }, [getAllRooms]);

  const [pageState, setPageState] = useState(PAGE_NAME.date);
  const [countOfPepole, setCountOfPepole] = useState(1);
  const minute = 1000 * 60;
  const [selecteDuration, setSelectedDuration] = useState(minute * 30);
  const [room, setRoom] = useState("לא משנה החדר");
  const decrementNumOfPeople = () =>
    setCountOfPepole(countOfPepole <= 0 ? countOfPepole : countOfPepole - 1);
  newBooking.people = countOfPepole;

  const incrementNumOfPepole = () => {
    setCountOfPepole(countOfPepole >= 10 ? countOfPepole : countOfPepole + 1);
    newBooking.people = countOfPepole;
  };
  const navigate = useNavigate();

  const goForward = () => {
    console.log(
      "🚀 ~ file: NewBooking.jsx ~ line 56 ~ goForward ~ goForward",
      pageState
    );
    switch (pageState) {
      case PAGE_NAME.date:
        console.log("hi", { ...bookingStore.newBooking });

        setPageState(PAGE_NAME.time);
        break;
      case PAGE_NAME.time:
        console.log("bye", { ...bookingStore.newBooking });
        setPageState(PAGE_NAME.details);
        break;
      case PAGE_NAME.details:
        console.log("chau", { ...bookingStore.newBooking });
        setPageState(PAGE_NAME.searching);
        break;
      default:
        break;
    }
  };

  const goBack = () => {
    switch (pageState) {
      case PAGE_NAME.date:
        navigate("/home");
        break;
      case PAGE_NAME.time:
        setPageState(PAGE_NAME.date);
        break;
      case PAGE_NAME.details:
        setPageState(PAGE_NAME.time);
        break;
      case PAGE_NAME.searching:
        setPageState(PAGE_NAME.details);
        break;
      default:
        break;
    }
  };

  return (
    <div className="craeteNewBooking">
      {pageState !== PAGE_NAME.searching && (
        <BackArrow text={"פגישה חדשה"} onClick={goBack} />
      )}
      {pageState !== PAGE_NAME.date && (
        <BookingDetails
          date={newBooking.date}
          hour={newBooking.startHour}
          end={newBooking.endHour}
          page={pageState}
          rooms={rooms}
          room={room}
          setRoom={setRoom}
          setPickedRoom={setPickedRoom}
          countOfPepole={countOfPepole}
        />
      )}
      <BookingDetails
        date={newBooking.date}
        startHour={newBooking.startHour}
        endHour={newBooking.endHour}
        page={pageState}
        rooms={rooms}
        room={room}
        setRoom={setRoom}
        setPickedRoom={setPickedRoom}
        countOfPepole={countOfPepole}
      />
      {pageState === PAGE_NAME.date && (
        <NewBookingPickDate setStartDate={setStartDate} />
      )}
      {pageState === PAGE_NAME.time && (
        <NewBookingPickHour setStartHour={setStartHour} />
      )}
      {pageState === PAGE_NAME.details && (
        <NewBookingPickRoom
          countOfPepole={countOfPepole}
          decrementNumOfPeople={decrementNumOfPeople}
          incrementNumOfPepole={incrementNumOfPepole}
          setSelectedDuration={setSelectedDuration}
          selecteDuration={selecteDuration}
          setEndHour={setEndHour}
        />
      )}
      {pageState === PAGE_NAME.searching && (
        <>
          <BackArrow onClick={goBack} />
          <SearchingNewBooking ountOfPepole={countOfPepole} room={room} />
        </>
      )}{" "}
      {pageState !== PAGE_NAME.searching && (
        <div className="footerButtons">
          <Button
            text1={pageState === PAGE_NAME.details ? "חיפוש" : " < המשך "}
            text2={"חזרה"}
            happend1={goForward}
            happend2={goBack}
            disabled={
              (!newBooking.date && pageState === PAGE_NAME.date) ||
              (!newBooking.startHour && pageState === PAGE_NAME.time) ||
              (!newBooking.endHour && pageState === PAGE_NAME.details)
            }
          />
        </div>
      )}
    </div>
  );
};

const BookingObserver = observer(SearchMeeting);
export default BookingObserver;
