function SMSError({ status }) {
  switch (status) {
    case 0:
      return null;
    case 1:
      return <div className="bt-login-error">Wrong shipment_id</div>;
    case 2:
      return <div className="bt-login-error">ייותר מידי ניסיונות</div>;
    case 3:
      return <div className="bt-login-error">קוד שגוי</div>;
    case 4:
      return <div className="bt-login-error">קוד לא בתוקף</div>;
    case 5:
      return <div className="bt-login-error">הטלפון לא נמצא במערכת</div>;
    case 6:
      return <div className="bt-login-error">כתובת המייל כבר נמצאת בשימוש במערכת</div>;
    case 7:
      return <div className="bt-login-error">כתובת המייל לא נמצאת במערכת</div>;
    case 8:
      return <div className="bt-login-error">מספר הטלפון כבר בשימוש במערכת</div>;
    default:
      return null;
  }
}

export default SMSError;
