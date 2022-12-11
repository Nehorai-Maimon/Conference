import { makeAutoObservable, IObservableArray } from 'mobx';
// import User from '../../common/models/User';
// import { UserType } from '../../common/consts/enums';
import UserApi from '../Apis/UserApi'
import AuthApi from '../Apis/AuthApi'
// import rootStores from "./Main"



// const userStore = rootStores.USERS_STORE
// console.log("🚀 ~ file: Auth.store.js ~ line 11 ~ userStore", userStore)


class AuthStore {
    auth = {};
    isLogin = Boolean(localStorage.auth_token);
    constructor() {
        makeAutoObservable(this);
    }
    logOut = async () => {
        localStorage.clear()
        this.isLogin = Boolean(localStorage.auth_token);
    }
    login = async (body) => {
        try {
            const accessToken = await AuthApi.login(body);
            if (accessToken !== "Invalid password") {
                this.isLogin = Boolean(localStorage.auth_token);
            }
            return accessToken;
        } catch (error) {
            console.log("🚀 ~ file: Auth.store.js ~ line 24 ~ AuthStore ~ login= ~ error", error)
            return error
        }
    }



}

export default AuthStore;
