import moment from "moment";
import { Fragment } from "react";
import Select from "react-select";

import classes from "./BookingDetails.module.css";

export default function BookingDetails(props) {
  const {
    date,
    startHour,
    endHour,
    room,
    page,
    setRoom,
    rooms,
    setPickedRoom,
    countOfPepole,
  } = props;

  const PAGE_NAME = {
    date: 1,
    time: 2,
    details: 3,
    searching: 4,
  };

  const handleSelect = (e) => {
    const selectedRoom = e || "לא משנה החדר";
    setRoom(selectedRoom);
    console.log(selectedRoom);
    console.log(room);
    setPickedRoom(selectedRoom);
  };


  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: '1px dotted pink',
  //     color: state.isSelected ? 'red' : 'blue',
  //     backgroundColor: "transparent",
  //     direction: "rtl",
  //     padding: 20,
  //   }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';
  
  //     return { ...provided, opacity, transition };
  //   }
  // }

  console.log("room", room);

  return (
    <Fragment>
      {date && (
        <div className={classes.detailsOfNewBooking}>
          <h4 className={`${classes.pickDate} subtitle `}>
            {date && `${moment(date).format("DD/MM/YY")} תאריך`}
          </h4>
          <h4 className={classes.styleText}>
            {page !== PAGE_NAME.searching &&
              startHour &&
              `${moment(startHour).format("kk:mm")} שעה`}
            {page === PAGE_NAME.searching &&
              startHour &&
              `${moment(endHour).format("kk:mm")} - ${moment(startHour).format(
                "kk:mm"
              )}`}
          </h4>

          {page === PAGE_NAME.details && (
            <Select
              isClearable
              // styles={customStyles}
              options={rooms}
              onChange={handleSelect}
              label="Single select"
              defaultValue={room.value}
              placeholder={room}
            />
          )}
          {page === PAGE_NAME.searching && (
            <h4 className={classes.styleText}>
              {room !== "לא משנה החדר"
                ? `${`:חדר "${room.label}"`} עבור ${countOfPepole} משתתפים`
                : `חדר כלשהו עבור ${countOfPepole} משתתפים`}
            </h4>
          )}
        </div>
      )}
    </Fragment>
  );
}
