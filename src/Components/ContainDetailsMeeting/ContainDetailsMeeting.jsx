import "./ContainDetailsMeeting.css";
import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetingDetails from "../MeetingDetails/MeetingDetails";
import CancelMeeting from "../CancelMeeting/CancelMeeting";
import Button from "../Button/Button";

const bool = require("../../Assets/Images/bool.png");
const WiFi = require("../../Assets/Images/wi-fi.png");
const screen = require("../../Assets/Images/screen.png");
const coffee = require("../../Assets/Images/coffee.png");
const treat = require("../../Assets/Images/treat.png");

const ContainDetailsMeeting = () => {
  const [saveMeet, setSaveMeet] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);

  const navigate = useNavigate();

  const openCancelPopup = () => {
    setCancelPopup(true);
  };

  const closeCancelPopup = () => {
    setCancelPopup(false);
  };

  const saveMeeting = () => {
    setSaveMeet(true);
  };

  return (
    <div className="container-details-of-meeting">
      {cancelPopup && (
        <CancelMeeting
          text={"?בטוח לא לשריין את הפגישה"}
          happend1={navigate("/home")}
          happend2={closeCancelPopup}
        />
      )}
      {!saveMeet ? (
        <div>
          <img className="bool" src={bool} alt="bool" />
          <p className="we-found">מצאנו את מה שחיפשת</p>
        </div>
      ) : (
        <p className="schedule-a-meeting">יאללה, קבענו</p>
      )}
      <MeetingDetails
        start={"Sat Jul 16 2022 21:03:51 GMT+0300 (שעון ישראל (קיץ))"}
        end={"Sat Jul 16 2022 21:03:51 GMT+0300 (שעון ישראל (קיץ))"}
        room={{
          name: "עשור",
          picture:
            "https://images.unsplash.com/photo-1628062699790-7c45262b82b4",
        }}
      />
      {!saveMeet ? (
        <>
          <p className="save-for-you">?לשמור לך תמורת 2 קרדיטים</p>
          <Button
            text1={"בטח"}
            text2={"בעצם לא"}
            happend1={() => saveMeeting}
            happend2={openCancelPopup}
            styleButtons={"details-alternate-meeting-css"}
          />
        </>
      ) : (
        <>
          <div className="container-all-benefits ">
            <div className="display style-benefits">
              <div className="contains-benefits">
                <img className="benefits wifi" src={WiFi} alt="wifi" />
                <p className="description-benefit">WI-FI</p>
              </div>
              <div className="contains-benefits">
                <img className="benefits" src={coffee} alt="coffee" />
                <p className="description-benefit">קפה</p>
              </div>
            </div>
            <div className="display">
              <div className="contains-benefits">
                <img className="benefits" src={treat} alt="treat" />
                <p className="description-benefit">פינוקים</p>
              </div>
              <div className="contains-benefits">
                <img className="benefits" src={screen} alt="screen" />
                <p className="description-benefit">מסך גדול</p>
              </div>
            </div>
          </div>
          <Button
            text1={"שתף פגישה"}
            text2={"לא הפעם"}
            // happend1={() => { }}
            happend2={navigate("/home")}
          />
        </>
      )}
    </div>
  );
};

const ContainMeetingObserver = observer(ContainDetailsMeeting);
export default ContainMeetingObserver;
