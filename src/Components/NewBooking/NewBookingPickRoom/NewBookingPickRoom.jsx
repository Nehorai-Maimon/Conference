import Select from "react-select";
import classes from "./NewBookingPickRoom.module.css";

const NewBookingPickRoom = (props) => {
  const {
    setEndHour,
    selectedDuration,
    setSelectedDuration,
    incrementNumOfPepole,
    decrementNumOfPeople,
    countOfPepole,
  } = props;
  const minute = 1000 * 60;
  const hour = minute * 60;

  const handleSelect = (e) => {
    setSelectedDuration(e.value);
    setEndHour(e.value);
  };
  const duration = [
    { value: minute * 30, label: "חצי שעה" },
    { value: hour, label: "שעה" },
    { value: minute * 90, label: "שעה וחצי" },
    { value: hour * 2, label: "שעתיים" },
    { value: minute * 150, label: "שעתיים וחצי" },
    { value: hour * 3, label: "שלוש שעות" },
    { value: minute * 210, label: "שלוש וחצי שעות" },
    { value: hour * 4, label: "ארבע שעות" },
    { value: hour * 12, label: "כל היום" },
  ];
  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.timeQuestion}>?והפגישה, כמה זמן</h3>
        <div style={{ width: "20.625rem", margin: "auto" }}>
          <Select
            options={duration}
            onChange={handleSelect}
            label="Single select"
            defaultValue={selectedDuration}
            placeholder={duration[0].label}
          />
        </div>
        <h4 className={`${classes.countOfPeopleQuestion} subtitle`}>
          ?וכמה אנשים תהיו
        </h4>
        <div className={classes.addParticipantsContainer}>
          <button
            className={classes.minusButton}
            onClick={decrementNumOfPeople}
          >
            -
          </button>
          <span className={classes.numberOfParticipant}>{countOfPepole}</span>
          <button className={classes.plusButton} onClick={incrementNumOfPepole}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBookingPickRoom;
