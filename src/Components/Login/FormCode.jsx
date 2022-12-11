import "./FormCode.css";
import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import rootStores from "../../Stores/Main";
import SMSError from "./SMSError";
import Button from "../Button/Button";
import BackArrow from "../Header/BackArrow/BackArrow";
const authStore = rootStores.AUTH_STORE;

function FormCode() {

  const { verifySms, errorStatus, smsResponse, user } = authStore;
  // const [code, setCode] = useState("");
  const [telInput, setTelInput] = useState("");
  const [proceed, setProceed] = useState(false);
  const navigate = useNavigate();

  const validCode = (e) => {
    let code = e.target.value;
    setTelInput(code);
    setProceed(code.length === 6 && !isNaN(Number(code)));
  };

  return (
    <>
    <BackArrow text={"כניסה"}  onClick={() => {
          navigate("/login/password");
        }} />
      <div className="bt-login-div-first-code">
        <div className="main-title"> שלחנו לך קוד </div>
        <form
          className="bt-code-input-form"
          onSubmit={ async (e) => {
            e.preventDefault();
           const loggedIn= await verifySms(telInput);
            if (loggedIn) {navigate("/home")};

          }}
        >
           <h4 className="subtitle">{`נשלח קוד זיהוי למספר ${
            user.phone.slice(0, 3) +
            "-" +
            user.phone.slice(3, user.phone.length)
          }`}</h4>
          <input
            className="bt-code-input"
            type="text"
            placeholder="הקוד שקיבלת"
            maxLength={6}
            // value={code}
            value={telInput}
            onChange={validCode}
            // onChange={(e) => setCode(e.target.value)}
          />
          <SMSError status={errorStatus} />
         <Button 
             text1={"< המשך "} 
             disable={!proceed} 
             styleButton={!proceed ? "button-before-valid" : ""} />
        </form>
      </div>
      </>
  );
}

export default observer(FormCode);
