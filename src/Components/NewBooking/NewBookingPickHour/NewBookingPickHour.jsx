import classes from "./NewBookingPickHour.module.css";

function NewBookingPickHour(props) {
  const { setStartHour } = props;
  const hoursArr = [
    // { value: "00" },
    // { value: "01" },
    // { value: "02" },
    // { value: "03" },
    // { value: "04" },
    // { value: "05" },
    // { value: "06" },
    // { value: "07" },
    // { value: "08" },
    { value: "09" },
    { value: "10" },
    { value: "11" },
    { value: "12" },
    { value: "13" },
    { value: "14" },
    { value: "15" },
    { value: "16" },
    { value: "17" },
    // { value: "18" },
    // { value: "19" },
    // { value: "20" },
    // { value: "21" },
    // { value: "22" },
    // { value: "23" },
  ];
  const minutesArr = [
    { value: "00" },
    { value: "15" },
    { value: "30" },
    { value: "45" },
  ];
  let buttons = [];
  for (let i = 0; i < hoursArr.length; i++) {
    for (let j = 0; j < minutesArr.length; j++) {
      buttons.push(`${hoursArr[i].value}:${minutesArr[j].value}`);
    }
  }

  return (
    <div className={classes.time}>
      <h3 className={`${classes.head_line} ${classes.question}`}>באיזה שעה?</h3>
      <div className={classes.time_picker}>
        {buttons.map((button) => (
          <button
            className={classes.time_button}
            key={button}
            onClick={() => {
              let hour = button.valueOf();
              setStartHour(hour);
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NewBookingPickHour;
