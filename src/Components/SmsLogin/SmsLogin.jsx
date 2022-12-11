import { observer } from 'mobx-react-lite';
import React from 'react'
import rootStores from '../../Stores/Main';
import { LoginScreenAction, LoginScreenElements, LoginScreenHeader } from '../LoginScreenElements/LoginScreenElements'

const authStore = rootStores.AUTH_STORE;

function PasswordLogin() {
    const { login } = authStore;
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = { mail: data.get('email'), password: data.get('password') }
        login(body)
        console.log("🚀 ~ file: PasswordLogin.jsx ~ line 15 ~ handleSubmit ~ body", body)
    }
    return (
        <LoginScreenElements>
            <LoginScreenHeader>
                התברות עם סמס
            </LoginScreenHeader>
            <LoginScreenAction>
                <form onSubmit={handleSubmit} className="form-login-screen">

                    <input type="email" name="email" placeholder="הקלד אימייל המקושר לחשבונך" />
                    <input type="password" name="password" placeholder="הקלד את סיסמתך" />
                    <button type="submit" name="submit" className="login-button">
                        <p>
                            <b>
                                כניסה
                            </b>
                        </p>
                    </button>
                </form>
            </LoginScreenAction>
        </LoginScreenElements>
    )
}

export default observer(PasswordLogin)