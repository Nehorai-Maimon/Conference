import "./ShareMeeting.css";
// import { FacebookShareCount,} from "react-share";

  import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    EmailIcon,
    FacebookIcon,
    // FacebookMessengerIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
  import rootStores from "../../Stores/Main";
  import moment from "moment";
  import "moment/locale/he";
  
  moment().format();
  moment.locale("he");

  const bookingStore = rootStores.BOOKINGS_STORE;

export default function ShareMeeting({ onClose }) {
 
    const { currentBooking } = bookingStore;

  let shareUrl= "https://binyamintech.co.il"

  let title = "נפגשים בבנימין טק!";

  let textOfMessage = `
  קבעתי לנו פגישה! 
  בתאריך ${moment(currentBooking.startMeeting).format("DD/MM/YY")}, 
  יום ${moment(currentBooking.startMeeting).format("dddd")}  
  בשעה ${moment(currentBooking.endMeeting).format("LT")} - ${moment(currentBooking.startMeeting).format("LT")} 
  בחדר ${currentBooking.roomId?.name} 
  {${<a href="https://waze.com/ul/hsv9j62u44">  אנחנו ממקומים בשער בנימין  </a>}}
  אגב,
  שווה להציץ במערכת של בנימין טק לקביעת פגישות - זה עובד פצצה!
  `
//   נסיעה עם Waze אל אזור תעשייה שער בנימין: {https://waze.com/ul/hsv9j62u44}

  console.log(textOfMessage);
  
  return (
      <div className="include-share-meeting">
    <div className="container-share-meeting">
        <button className="close-share-meeting" onClick={onClose}>x</button>
        <span>:שתף עם</span>
      <div className="contains-icons">

      <WhatsappShareButton url={shareUrl} title={title} body={textOfMessage} separator={textOfMessage} >
         <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton subject={title} body={textOfMessage} >
         <EmailIcon size={32} round={true}  />
      </EmailShareButton>
      
      <TwitterShareButton url={shareUrl}>
         <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <TelegramShareButton url={shareUrl} title={title}>
         <TelegramIcon size={32} round={true} />
      </TelegramShareButton>

      <LinkedinShareButton url={shareUrl} title={title} description={textOfMessage} >
         <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>

      <FacebookShareButton url={shareUrl} quote={title} >
         <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      {/* <FacebookMessengerIcon size={32} round={true} /> */}
      </div>
    </div>
    </div>
  );
}
