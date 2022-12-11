// import { Link } from "@mui/material/node";
import { observer } from "mobx-react";
import { useState, useRef } from "react";
import { useEffect } from "react";
// import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import rootStores from "../../Stores/Main";
// import CustomInput from "../FormTools/CustomInput";
import Button from "../Button/Button";
import BackArrow from "../Header/BackArrow/BackArrow";
import SMSError from "../Login/SMSError";
import "./SMSRegister.css";
const icon = require("../../Assets/Images/booking_icon.png");

const displayStateEnum = {
  setPhone: "setPhone",
  verifyPhone: "verifyPhone",
  details: "details",
  landingPage: "landing",
};

const authStore = rootStores.AUTH_STORE;

function SMSRegister() {

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [sendAgain, setSendAgain] = useState(60);
  const [telInput, setTelInput] = useState("");
  const [proceed, setProceed] = useState(false);
  const [trailes, setTrailes] = useState(1);
  const [displayState, setDisplayState] = useState(displayStateEnum.setPhone);
  const { sendSms, errorStatus, user, signUp, verifySmsRegister, changeLoginState } = authStore;

  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (displayState === "verifyPhone") {
      inputRef.current.focus()
      let timer = 30;
      let showTime;
      interval = setInterval(() => {
        timer--;
        showTime = timer.toString();
        setSendAgain(showTime.length === 2 ? showTime : "0" + showTime);
        if (timer === 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
    else if (displayState === displayStateEnum.landingPage) {
          const timer = setTimeout(() => changeLoginState()
          , 5000);
          return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [displayState, trailes, changeLoginState]);

  const sendSMS = async () => {
    try {
      await sendSms(telInput, true);
      setProceed(false);
      setDisplayState(displayStateEnum.verifyPhone);
      setTelInput("");
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    switch (displayState) {
      case "setPhone":
        navigate("/login/hello");
        break;
      case "verifyPhone":
        setDisplayState(displayStateEnum.setPhone);
        break;
      case "details":
        setDisplayState(displayStateEnum.verifyPhone);
        break;
      case "landing":
        setDisplayState(displayStateEnum.details);
        break;
      default:
        break;
    }
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      console.dir(e.target);
        let newUser = {
        phone: user.phone,
        email: e.target[2].value,
        firstName: e.target[0].value,
        lastName: e.target[1].value,
      };
      await signUp(newUser);
      setDisplayState(displayStateEnum.landingPage);
    } catch (e) {
      console.log("🚀 ~ file: SMSRegister.jsx ~ line 67 ~ register ~ e)", e);
    }
  };

  const verifyPhone = async () => {
    try {
      await verifySmsRegister(telInput);
      setDisplayState(displayStateEnum.details);
      setProceed(false);
    } catch (err) {
      console.log(
        "🚀 ~ file: SMSRegister.jsx ~ line 33 ~ verifyPhone ~ err",
        err
      );
      setErr(err.response.data.error);
    }
  };

  const validPhone = (e) => {
    let reg = /^[05][0-9]{9}/;
    reg.test(e.target.value);
    let phone = e.target.value;
    setTelInput(phone);
    setProceed(
      phone.startsWith("05") && phone.length === 10 && !isNaN(Number(phone))
    );
  };

  const validCode = (e) => {
    let code = e.target.value;
    setTelInput(code);
    setProceed(code.length === 6 && !isNaN(Number(code)));
  };

  const validInput = (e) => {
    let input = e.target.value;
     setProceed(input.length >= 2)
  };

  return (
    <div>
      <BackArrow
        text={displayState !== displayStateEnum.landingPage ? "הרשמה" : null}
        onClick={goBack}
      />
      {displayState === displayStateEnum.setPhone && (
        <div className="div-form-register-container">
          <h1 className="main-title"> ?מה מספר הנייד שלך</h1>
          <h4 className="subtitle">אנחנו כבר שולחים לך קוד</h4>
          <input
            className="bt-register-input-css"
            type="tel"
            placeholder="הנייד שלך"
            onChange={validPhone}
            value={telInput}
            ref={inputRef}
          />
          <SMSError status={errorStatus} />

          <NavLink to="/register/password">
            <p className="subtitle">להרשמה עם סיסמא</p>
          </NavLink>
          <div className="buuton-login-block">
            <Button
              text1={"SMS שלחו לי "}
              disabled={!proceed}
              styleButton={!proceed ? "button-before-valid" : ""}
              happend1={sendSMS}
            />
          </div>
        </div>
      )}

      {displayState === displayStateEnum.verifyPhone && (
        <div className="div-form-register-container">
          <h1 className="main-title">שלחנו לך קוד</h1>
          <h4 className="subtitle">{`נשלח קוד זיהוי למספר ${user.phone.slice(0, 3) +
            "-" +
            user.phone.slice(3, user.phone.length)
            }`}</h4>
          <input
            className="bt-register-input-css"
            name="number"
            type="number"
            placeholder="הקוד ששלחנו לך"
            value={telInput}
            onChange={validCode}
            ref={inputRef}
          />
          {err && <div style={{ color: "red" }}>{err.toLowerCase()}</div>}
          <SMSError status={errorStatus} />
          {
            <div style={{ display: "flex", margin: "auto" }}>
              {Number(sendAgain) === 0 ? (
                <div
                  onClick={() => {
                    Number(sendAgain) === 0 &&
                      sendSms(user.phone, true) &&
                      setTrailes(trailes + 1);
                  }}
                  style={{margin: "auto", color: "blue"}} >
                  לא קיבלתי - שלחו שוב
                </div>
              ) : (
                <label className={Number(sendAgain) !== 0 ?`timerOfCode` : 'sendAgainCode'}>{`00:${sendAgain}`}</label>
                )}
            </div>
          }
          <Button
            text1={" < המשך "}
            happend1={verifyPhone}
            styleButton={!proceed ? "button-before-valid" : ""}
            disabled={!proceed}
          />
        </div>
      )}

      {displayState === displayStateEnum.details && (
        <form onSubmit={register}>
          <div className="div-form-register-container">
            <h1 className="main-title"> (: נעים מאוד</h1>
            <h4 className="subtitle">{` נשמח להכיר אותך,כמה פרטים חשובים ונמשיך `}</h4>
            <input
              className="bt-register-input-css"
              name="firstName"
              placeholder="שם פרטי"
              onChange={validInput}
              required
              ref={inputRef}
            />
            <input
              className="bt-register-input-css"
              name="lastName"
              placeholder="שם משפחה"
              onChange={validInput}
              required
            />
            <input
              className="bt-register-input-css"
              type="email"
              name="email"
              placeholder="מייל"
              onChange={validInput}
              p="Email"
            />
            <SMSError status={errorStatus} />
            <Button
              text1={" < המשך"}
              styleButton={!proceed ? "button-before-valid" : ""}
              disable={!proceed}
            />
          </div>
        </form>
      )}
      {displayState === displayStateEnum.landingPage && (
        <div className="landing-page">
          <span>!כיף שהצטרפת , {user.firstName}</span>
          <p>יאללה, אפשר להתחיל להיפגש</p>
          <img src={icon} alt="icon" style={{height: "2.625rem", width: "3.25rem", margin: "10px"}} />
          <Button happend1={changeLoginState} text1={" < המשך "} />
        </div>
      )}
    </div>
  );
}

export default observer(SMSRegister);

