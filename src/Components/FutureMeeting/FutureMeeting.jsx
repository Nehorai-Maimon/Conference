import "./FutureMeeting.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rootStores from "../../Stores/Main";

const userStore = rootStores.USERS_STORE;

function FutureMeeting() {

  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const { getUserDetails } = userStore;

  useEffect(() => {
    async function getUnits() {
      const res = await getUserDetails();
      console.log("🚀 ~ file: FutureMeeting.jsx ~ line 22 ~ getUnits ~ res", res)
      setDetails(res);
      return;
    }
    getUnits();
  }, [getUserDetails]);

  return (
    <>
      <div className="primary-button" onClick={() => navigate("/new-meeting")}>
        <p className="newMeeting">
          <b>קביעת פגישה חדשה +</b>
        </p>
      </div>
      {details && (
        <p className="creditsData">
        יתרת הקרדיטים שלך היא {details.creditsData.currentMonthBalance} ,
          חודש הבא {details.creditsData.nextMonthBalance}, רק אומרים
        </p>
      )}
    </>
  );
}

export default FutureMeeting;
