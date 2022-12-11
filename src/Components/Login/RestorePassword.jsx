import { useState } from 'react'
import { observer } from "mobx-react";
import BackArrow from '../Header/BackArrow/BackArrow';
import Button from '../Button/Button';
import { LoginScreenAction, LoginScreenElements } from '../LoginScreenElements/LoginScreenElements';
import { useNavigate, useParams } from 'react-router-dom';
import rootStores from '../../Stores/Main';

const authStore = rootStores.AUTH_STORE;


function RestorePassword() {
    const [isInputValid, setIsInputValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    console.log("🚀 ~ file: RestorePassword.jsx ~ line 14 ~ RestorePassword ~ isInputValid", isInputValid)
    const { changePassword } = authStore
    const navigate = useNavigate();
    const header = useParams("token")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const password = data.get("password");
        try {
            setErrorMessage("")
            await changePassword(password, header.token)

        } catch (e) {
            console.log("🚀 ~ file: RestorePassword.jsx ~ line 29 ~ handleSubmit ~ e", e)
            setErrorMessage(e.response.data)
        }
    }
    const handeleInput = (e) => {

        setIsInputValid(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/.test(e.target.value))
    }
    return (
        <LoginScreenElements>

            {/* <BackArrow text={"כניסה"} onClick={goBack} /> */}
            {/* <LoginScreenHeader>התחברות עם סיסמה</LoginScreenHeader> */}
            <LoginScreenAction>
                <form onSubmit={handleSubmit} className="form-login-screen">

                    <BackArrow text={"כניסה"} onClick={() => navigate("/login/hello")} />
                    <h4 className="log-password-h4-css">כניסה עם סיסמא</h4>
                    {/* <input type="email" name="email" placeholder=" אימייל" required /> */}

                    <input
                        type="password"
                        name="password"
                        placeholder="הקלד סיסמה חדשה"
                        required
                        onChange={handeleInput}
                    />
                    {!isInputValid && <p style={{ color: "red" }}>יש לבחור סיסמה בת 4-8 תוים המורכבת מאנגלית וספרות</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <Button
                        text1={" < שנה סיסמה"}
                        disabled={!isInputValid}
                    />
                </form>
            </LoginScreenAction>
        </LoginScreenElements>

    )
}

export default observer(RestorePassword)




