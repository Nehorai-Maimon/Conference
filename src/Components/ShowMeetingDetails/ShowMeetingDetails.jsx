import "./ShowMeetingDetails.css";
import { useState } from "react";
import Button from "../Button/Button";
import CancelMeeting from "../CancelMeeting/CancelMeeting";
import MeetingDetails from "../MeetingDetails/MeetingDetails";
import rootStores from "../../Stores/Main";
import { useNavigate } from "react-router-dom";
import BackArrow from "../Header/BackArrow/BackArrow";
import ShareMeeting from "../ShareMeeting/ShareMeeting";

const bookingStore = rootStores.BOOKINGS_STORE;

export default function ShowMeetingDetails({ onClose }) {

  const [cancelPopup, setCancelPopup] = useState(false);
  const [shareMeeting, setShareMeeting] = useState(false);
  const { getAllBookings, deleteBooking, currentBooking } = bookingStore;

  const openCancelPopup = () => {
    setCancelPopup(true);
  };

  const closeCancelPopup = () => {
    setCancelPopup(false);
  };

  const shareMeetingOnclick = () => {
    setShareMeeting(true)
  };

  
  const shareMeetingOnclose = () => {
    setShareMeeting(false)
  };

  const navigate = useNavigate();

  const cancelMeeting = async () => {
    console.log("cancel", currentBooking._id);
    await deleteBooking(currentBooking._id);
    await getAllBookings();
    navigate("/");
  };

  return (
    <div className="container-show-meeting-details">
      <BackArrow onClick={()=> navigate("/home")} />
      {cancelPopup && (
        <CancelMeeting
          text={"?בטוח לבטל את הפגישה"}
          happend1={cancelMeeting}
          happend2={closeCancelPopup}
          styleButton={"pop-up-buttons"}
        />
      )}
     {shareMeeting && (
       <ShareMeeting onClose={shareMeetingOnclose} />
      )}
      <MeetingDetails />
      <div className="cancel-meeting" onClick={() => openCancelPopup()}>
        ביטול פגישה
      </div>
      <Button
        text1={"שתף פגישה"}
        text2={"חזרה"}
        happend1={shareMeetingOnclick}
        happend2={()=> navigate("/home")}
        styleButtons={"buttons-of-the-page"}
      />
    </div>
  );
}
