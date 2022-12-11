import "./CancelMeeting.css";
import Button from "../Button/Button";
const cancel = require("../../Assets/Images/cancle_meeting.png");

export default function CancelMeeting({
  text,
  happend1,
  happend2,
  styleButton,
}) {
  return (
    <div className="container-cancel-meeting">
      <img src={cancel} alt="icon" className="cancel-icon" />
      <p className="are-you-shure">{text}</p>
      <Button
        text1={"אישור"}
        text2={"ביטול"}
        happend1={happend1}
        happend2={happend2}
        styleButton={styleButton}
      />
    </div>
  );
}
