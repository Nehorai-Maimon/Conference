import React from "react";
import { useState } from "react";
import "./Meetings.css";

export default function RoomCost() {
  const meetings = [
    {
      date: "12/04/22",
      day: "שלישי",
      time: {
        startMeeting: "13:00",
        endMeeting: "14:30",
      },
      room_name: "חדר נבל",
      this_month: true,
    },
    {
      date: "12/04/22",
      day: "שלישי",
      time: {
        startMeeting: "13:00",
        endMeeting: "14:30",
      },
      room_name: "חדר נבל",
      this_month: true,
    },
    {
      date: "08/05/22",
      day: "ראשון",
      time: {
        startMeeting: "15:00",
        endMeeting: "16:30",
      },
      room_name: "חדר כינור",
      this_month: false,
    },
    {
      date: "25/04/22",
      day: "שני",
      time: {
        startMeeting: "10:00",
        endMeeting: "12:30",
      },
      room_name: "חדר צליל",
      this_month: true,
    },
  ];

  const [futureMeetings, setFutureMeeetings] = useState([]);
  const [previousMeetings, setPreviousMeetings] = useState([]);
  const [showPreviousMeetings, setShowPreviousMeetings] = useState(false);
  console.log(showPreviousMeetings);
  console.log("pre", previousMeetings);
  console.log(futureMeetings);
  // console.log(meetings);

  const filterMeetings = () => {
    meetings.map((meet) =>
      meet.this_month ? console.log("future", meet) : console.log("prev", meet)
    );

    console.log("done");

    // meetings.map(meet => meet.this_month ?
    //     setFutureMeeetings(meet => [...futureMeetings, meet]) :
    //     setPreviousMeetings(meet =>[...previousMeetings, meet])
    // )
  };
  filterMeetings();

  return (
    <div className="user-meetings">
      <div className="show-meetings"> הפגישות שלך ({meetings.length})</div>
      {meetings.length > 0 ? (
        <div
          className="container-meetings"
          style={{ height: "185px", overflowY: "auto" }}
        >
          {meetings.map(
            (meeting) => (
              //   {meetings.map( meeting => meeting.this_month ? (
              <div className="detailsOfMeeting">
                <div className="details-dateAndDay">
                  <div> {meeting.date} </div>
                  <div> {meeting.day} </div>
                </div>
                <div className="details-timeAndRoom">
                  <div> {meeting.room_name} </div>
                  <div>
                    {" "}
                    {meeting.time.startMeeting} - {meeting.time.endMeeting}{" "}
                  </div>
                </div>
              </div>
            )
            //   : setPreviousMeetings(previousMeetings.unshift(meeting))
          )}
        </div>
      ) : (
        <div>אין פגישות בזמן הקרוב</div>
      )}

      <div
        className="previous-meetings"
        onClick={() => setShowPreviousMeetings(!showPreviousMeetings)}
      >
        {" "}
        פגישות קודמות{" "}
      </div>
      {showPreviousMeetings && meetings.length > 0 ? (
        <div
          className="container-meetings"
          style={{ height: "185px", overflowY: "auto" }}
        >
          {meetings.map((meeting) => (
            <div className="detailsOfMeeting">
              <div className="details-dateAndDay">
                <div> {meeting.date} </div>
                <div> {meeting.day} </div>
              </div>
              <div className="details-timeAndRoom">
                <div> {meeting.room_name} </div>
                <div>
                  {" "}
                  {meeting.time.startMeeting} - {meeting.time.endMeeting}{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
