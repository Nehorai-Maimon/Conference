import { useEffect, useState } from "react";
import "./HomePage.css";
import rootStores from "../../Stores/Main";
import { observer } from "mobx-react";

import Advertising from "../Advertising/Advertising";
import Header from "../Header/Header";
import MeetingDashbord from "../MeetingDashboard/MeetingDashbord";

const privateArea = require("../../Assets/Images/private-area.png");

const userStore = rootStores.USERS_STORE;
const authStore = rootStores.AUTH_STORE;
const bookingStore = rootStores.BOOKINGS_STORE;

const HomePage = () => {
  const { updateUser, user, getUserDetails } = userStore;
  const { logOut } = authStore;
  const { getAllBookingsByUser } = bookingStore;
  const [details, setDetails] = useState("");
  const [showLogOut, setShowLogOut] = useState(false);

  // const init = () => {
  //   console.log("🚀 ~ file: HomePage.jsx ~ line 10 ~ HomePage ~ user", user);
  //   updateUser();
  // };

  console.log("user", user);

  useEffect(() => {
    async function getUnits() {
      const res = await getUserDetails();
      setDetails(res);
      await getAllBookingsByUser(res._id);
      return;
    }
    getUnits();
  }, []);

  const showLogout = () => {
    setShowLogOut(!showLogOut);
  };

  console.log(details);

  return (
    <div className="home-page-container">
      <Header>
        <div>
          <div className="contain-private-area">
            <img
              src={privateArea}
              alt="private-area"
              className="private-area-header"
              onClick={showLogout}
            />
            <span>{details? details.firstName + " " + details.lastName : ''}</span>
          </div>
          {showLogOut ? (
            <button className="log-out-button" onClick={() => { logOut(); }} > התנתק </button> ) : null}
          <h1 className="fun-title">כיף (גם) להיפגש בבנימין.טק</h1>
        </div>
      </Header>
      <Advertising />
      <MeetingDashbord />
    </div>
  );
};

const HomePageObserver = observer(HomePage);
export default HomePageObserver;