import "./FormLogin.css";
import "react-phone-number-input/style.css";
import { useState, useRef } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import SMSError from "./SMSError";
import rootStores from "../../Stores/Main";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import BackArrow from "../Header/BackArrow/BackArrow";

const authStore = rootStores.AUTH_STORE;

function FormLogin() {
  const { sendSms, errorStatus } = authStore;
  const [valueInput, setValueInput] = useState("");
  const [proceed, setProceed] = useState(false);
  const navigate = useNavigate();

  const validPhone = (e) => {
    let phone = e.target.value;
    setValueInput(phone);
    setProceed(
      phone.startsWith("05") && phone.length === 10 && !isNaN(Number(phone))
    );
  };

  const inputRef = useRef(null);

  return (
    <form
      // className="login-form-formLogin"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const sent = await sendSms(valueInput);
        if (sent) {
          navigate("/login/verify");
        }
      }}
    >
      <BackArrow
        text={"כניסה"}
        onClick={() => {
          navigate("/login/hello");
        }}
      />
      <div className="container-form-login">
        <h3 className="main-title">?מה מספר הנייד שלך</h3>
        <p className="subtitle">אנחנו כבר שולחים לך קוד</p>

        <input
          className="bt-login-input-content-input"
          type="tel"
          name="phone"
          placeholder="הנייד שלך"
          onChange={validPhone}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          ref={inputRef}
        />

        <SMSError status={errorStatus} />
        <div className="under-line-div"></div>
        <div style={{ color: "#189E8D" }}>
          <Link to="/login/password">
            <p
              className="subtitle"
              style={{ color: "#189E8D", textDecoration: "none" }}
            >
              כניסה עם סיסמא
            </p>
          </Link>
          <div className="subtitle">
            עדיין אין לך חשבון?
            <Link className="subtitle" to="/register/sms">
              <u style={{ textDecoration: "underLine", color: "#189E8D" }}>
                להרשמה
              </u>
            </Link>
          </div>
        </div>
      </div>
      <Button
        text1={" SMS שלחו לי "}
        styleButton={!proceed ? "button-before-valid" : ""}
        disable={!proceed}
      />
    </form>
  );
}

export default observer(FormLogin);
