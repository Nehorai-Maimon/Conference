import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

import classes from "./NewBookingPickDate.module.css";

export default function NewBookingPickDate(props) {
  const [date, setDate] = useState(new Date());
  const { setStartDate } = props;
  const currentDay = new Date();
  const maxDate = currentDay.getMonth() + 1;
  return (
    <div className="searchMeetingByDate">
      <h3 className={classes.dateQuestionForUser}>?מתי מתאים לך</h3>
      <div className={classes.calanderContainer}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={date}
            onChange={(newDate) => {
              setDate(newDate);
              setStartDate(newDate);
            }}
            disablePast
            maxDate={currentDay.setMonth(maxDate)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
