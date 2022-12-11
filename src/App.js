import "./App.css";
import Home from "./Components/HomePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import rootStores from "./Stores/Main";
import Login from './Components/Login/Login';
import { observer } from 'mobx-react-lite';
import BookingObserver from './Components/NewBooking/NewBooking/NewBooking';
import NewLogin from './Components/NewLogin/NewLogin';
import PasswordLogin from './Components/PasswordLogin/PasswordLogin';
import LoginLayout from './Components/LoginLayout/LoginLayout';
import FormRegister from './Components/FormRegister/FormRegister';
import SMSRegister from './Components/SMSRegister/SMSRegister';
import RestorePassword from './Components/Login/RestorePassword';
import FormCode from './Components/Login/FormCode';
import ExactReasult from "./Components/SearchResults/ExactResult/ExactResult";
import Alternatives from "./Components/SearchResults/Alternatives/Alternatives";
import ShowMeetingDetails from "./Components/ShowMeetingDetails/ShowMeetingDetails";

const authStore = rootStores.AUTH_STORE;

function App() {

  const { isLogin } = authStore;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path={"/"} element={isLogin ? <Navigate to={`/home`} /> : <Navigate to={`/login/hello`} />} />
          <Route path="/home" element={isLogin ? <Home /> : <Navigate to={`/login/hello`} /> } />
          <Route path="/new-meeting" element={isLogin ? <BookingObserver /> : <Navigate to={`/login/hello`} />} />
          <Route path="/search-result/exact" element={<ExactReasult />} />
          <Route path="/meeting" element={<ShowMeetingDetails />} />

          <Route path="login" element={isLogin ? <Navigate to={`/home`} /> : <LoginLayout />} >
            <Route path="hello" element={<NewLogin />} />
            <Route path="password" element={<PasswordLogin />} />
            <Route path="sms" element={<Login />} />
            <Route path="verify" element={<FormCode />} />
          </Route>
          {!isLogin && <>
            <Route path="register">
              <Route path="sms" element={<SMSRegister />} />
              <Route path="password" element={<FormRegister />} />
            </Route>
            <Route path="forgot-password">
              <Route path="verify/:token" element={<RestorePassword />} />
            </Route>
          </>
          }


          {/* <Route path="/login" element={isLogin ? <Navigate to={`/home`} /> : <NewLogin />} /> */}
          {/* <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} */}
          {/* <Route path="/" element={<RestrictedRoute page={<Home />} />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/search-results" element={<Alternatives />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AppObserver = observer(App)
export default AppObserver;
