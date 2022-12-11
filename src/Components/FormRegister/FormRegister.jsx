// import React from "react";
import { observer } from "mobx-react";
import { Formik, Form } from "formik";
import CustomInput from "../FormTools/CustomInput";
import Button from "../Button/Button";
import { initialValues, validationSchema } from "../FormTools/FormValidation";
import rootStores from "../../Stores/Main";
import "./FormRegister.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../Header/BackArrow/BackArrow";
import SMSError from "../Login/SMSError";
const icon = require("../../Assets/Images/booking_icon.png");

const authStore = rootStores.AUTH_STORE;

function FormRegister() {
  const { signUp, clearErr, errorStatus, changeLoginState, user } = authStore;

  const navigate = useNavigate();

  const PAGE_NAME = {
    name: 1,
    password: 2,
    landing: 3
  };

  const [pageState, setPageState] = useState(PAGE_NAME.name);

  const goForward = () => {
    switch (pageState) {
      case PAGE_NAME.name:
        setPageState(PAGE_NAME.password);
        break;
      case PAGE_NAME.password:
        setPageState(PAGE_NAME.landing);
        break;
      case PAGE_NAME.landing:
        console.log("landing page");
        break;

      default:
        break;
    }
  };

  const goBack = () => {
    switch (pageState) {
      case PAGE_NAME.name:
        navigate("/login/hello");
        break;
      case PAGE_NAME.password:
        setPageState(PAGE_NAME.name);
        break;
      case PAGE_NAME.landing:
        setPageState(PAGE_NAME.password);
        break;
      default:
        break;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await signUp(values);
          resetForm();
          clearErr();
          setSubmitting(false);
        } catch (e) {}
      }}
    >
      {(props) => (
        <Form>
          <div>
            <BackArrow
              text={"הרשמה"}
              onClick={(e) => {
                goBack();
                console.log(
                  "🚀 ~ file: FormRegister.jsx ~ line 69 ~ FormRegister ~ props",
                  props
                );
              }}
            />
            {/* {console.log(props)} */}
            {pageState === PAGE_NAME.name && (
              <>
                <div className="bt-register-div-content-title">
                  (: נעים מאוד{" "}
                </div>
                <p className="happy-to-meet-you">
                  נשמח להכיר אותך, כמה פרטים חשובים ונמשיך
                </p>
                <CustomInput name="firstName" placeholder="שם פרטי" required />
                <CustomInput name="lastName" placeholder="שם משפחה" />
                <CustomInput name="email" placeholder="מייל" p="Email" />
                <Button
                  text1={"< המשך"}
                  happend1={goForward}
                  submit={false}
                  // disable={false}
                />
              </>
            )}
            {pageState === PAGE_NAME.password && (
              <>
                <div className="bt-register-div-content-title">
                  {" "}
                  הגדרת סיסמה אישית{" "}
                </div>
                <p>הסיסמה נועדה לשמור על פרטיותך</p>
                <CustomInput
                  name="password"
                  type="password"
                  placeholder="בחר סיסמה"
                />
                <p className="choose-strong-password">
                  יש לבחור סיסמה בת 4-8 תוים המורכבת מאנגלית וספרות
                </p>
                <SMSError status={errorStatus} />
                <Button
                  text1={props.isSubmitting ? "טוען..." : "< הירשם"}
                  submit={true}
                />
              </>
            )}
              {pageState === PAGE_NAME.landing && (
        <div className="landing-page">
          <span>!כיף שהצטרפת , {user.firstName}</span>
          <p>יאללה, אפשר להתחיל להיפגש</p>
          <img src={icon} alt="icon" style={{height: "2.625rem", width: "3.25rem", margin: "10px"}} />
          <Button happend1={changeLoginState} text1={" < המשך "} />
        </div>
      )}
            {/* <CustomInput
              name="confirmPassword"
              type="password"
              placeholder="אימות סיסמה"
            /> */}
            {/* <Button text1={"< המשך"} happend1={goForward} type={"submit"} /> */}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default observer(FormRegister);
