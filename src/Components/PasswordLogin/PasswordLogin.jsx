// import { input } from "@testing-library/user-event/dist/types/utils";
import "./PasswordLogin.css";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import rootStores from "../../Stores/Main";
import Button from "../Button/Button";
// import CustomInput from "../FormTools/CustomInput";
import BackArrow from "../Header/BackArrow/BackArrow";
// import SMSError from "../Login/SMSError";
import {
  LoginScreenAction,
  LoginScreenElements,
  // LoginScreenHeader,
} from "../LoginScreenElements/LoginScreenElements";

const authStore = rootStores.AUTH_STORE;

const PAGE_NAME = {
  password: 1,
  reset: 2,
  link: 3
};
function PasswordLogin() {
  const navigate = useNavigate();
  const { login, errMessage, errorStatus, sendRestoreMail, clearErr } =
    authStore;
  const [proceed, setProceed] = useState(false);
  const [email, setEmail] = useState();
  const [pageState, setPageState] = useState(PAGE_NAME.password);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (pageState === 1) {
      try {
        const body = {
          mail: data.get("email"),
          password: data.get("password"),
        };
        await login(body);

      } catch (err) {
        console.log(
          "🚀 ~ file: PasswordLogin.jsx ~ line 45 ~ handleSubmit ~ err",
          err
        );
      }
    } else if (pageState === 2) {
      try {
        await sendRestoreMail({ email: data.get("email") });
        setPageState(PAGE_NAME.link);
        clearErr();
      } catch (e) {
        console.log(
          "🚀 ~ file: PasswordLogin.jsx ~ line 49 ~ handleSubmit ~ e",
          e
        );
      }
    } else {
      goForward();
    }
  };

  const goForward = () => {
    switch (pageState) {
      case PAGE_NAME.password:
        setPageState(PAGE_NAME.reset);
        clearErr();
        break;
      case PAGE_NAME.reset:
        sendMeMail();
        break;
      case PAGE_NAME.link:
        navigate("/login/hello");
        break;

      default:
        break;
    }
  };

  const goBack = () => {
    switch (pageState) {
      case PAGE_NAME.password:
        console.log("page name");
        navigate("/login/hello");
        break;
      case PAGE_NAME.reset:
        console.log("page password");
        setPageState(PAGE_NAME.password);
        break;
      case PAGE_NAME.link:
        console.log("page password");
        setPageState(PAGE_NAME.reset);
        break;
      default:
        break;
    }
  };

  const validEmail = (value) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let check = reg.test(value);
    console.log("🚀 ~ file: PasswordLogin.jsx ~ line 112 ~ validEmail ~ check", check)
    setProceed(check);
  };

  const validPassword = (e) => {
    let password = e.target.value;
    setProceed(password.length <= 8 && password.length >= 4);
  };

  const sendMeMail = () => {
    try {
      console.log("haha");
    } catch (e) {}
  };

  const handleMailChange = (e) => {
    setEmail(e.target.value);
    validEmail(e.target.value);
    clearErr();
  };

  return (
    <LoginScreenElements>
      <LoginScreenAction>
        <form onSubmit={handleSubmit} className="form-login-screen">
          {pageState === PAGE_NAME.password && (
            <>
              <BackArrow text={"כניסה"} onClick={goBack} />
              <div className="login-password-container">
                <h4 className="secondary-title">כניסה עם סיסמא</h4>
                <input
                  type="email"
                  name="email"
                  placeholder=" אימייל"
                  required
                  onChange={validEmail}
                  ref={inputRef}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="הקלד את סיסמתך"
                  onChange={validPassword}
                />
                <Button
                  text1={" כניסה >"}
                  text2={"שכחתי סיסמא"}
                  happend2={goForward}
                  styleButton={!proceed ? "button-before-valid" : ""}
                  disable={!proceed}
                />
              </div>
            </>
          )}
          {pageState === PAGE_NAME.reset && (
            <>
              <BackArrow text={"איפוס סיסמא"} onClick={goBack} />
              <div className="reset-password-login">
                <h4 className="secondary-title"> יש להכניס כתובת מייל </h4>
                <input
                  type="email"
                  name="email"
                  placeholder=" אימייל"
                  required
                  onChange={handleMailChange}
                  style={{ direction: "rtl" }}
                  ref={inputRef}
                />
                {errMessage && (
                  <label style={{ color: "red" }}>{errMessage}</label>
                )}
                <Button 
                disabled={!proceed}
              styleButton={!proceed ? "button-before-valid" : ""}
              text1={"איפוס סיסמא"} />
              </div>
            </>
          )}
          {pageState === PAGE_NAME.link && (
            <>
              <BackArrow text={"איפוס סיסמא"} onClick={goBack} />
              <h4 className="log-password-h4-css">
                {" "}
                יש להיכנס ללינק שנשלח לכתובת {email} ולהזין סיסמא חדשה{" "}
              </h4>
              <Button submit={false} happend1={()=> {navigate("/login/hello")}} text1={"חזרה לכניסה לחשבון "} />
            </>
          )}
        </form>
      </LoginScreenAction>
    </LoginScreenElements>
  );
}

export default observer(PasswordLogin);
