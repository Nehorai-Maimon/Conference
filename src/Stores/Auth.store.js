// import User from '../../common/models/User';
// import { UserType } from '../../common/consts/enums';
import {
  makeAutoObservable,
  runInAction,
} from "mobx";
import UserApi from "../Apis/UserApi";
import AuthApi from "../Apis/AuthApi";
// import jwtDecode from "jwt-decode";
const { getUserDetails } = UserApi;
class AuthStore {
  auth = {};
  isLogin = false;
  constructor() {
    makeAutoObservable(this);
    this.isLogin = !!localStorage.getItem("auth_token");
    this.setUser(localStorage.getItem("auth_token"));
  }

  user = {};
  errMessage = ""
  smsResponse = {};
  
  errorStatus = 0;
  
  get isUserLoggedIn() {
    return !!this.user.email;
  }

  async setUser(token) {
    runInAction(() => {
      if (token == null) {
        localStorage.removeItem("auth_token");
        this.user = {};
      } else {
        runInAction(async () => {
          localStorage.setItem("auth_token", token);
          console.log("🚀 ~ file: Auth.store.js ~ line 38 ~ AuthStore ~ runInAction ~ this.isLogin", this.isLogin)
          this.user = await getUserDetails()
          this.isLogin = true;
          this.smsResponse = {};
          this.errorStatus = 0;
        })
        return this.user;
      }
    });
  }
  changeLoginState = () => {
    this.isLogin = Boolean(localStorage.auth_token);
  }
  signUp = async (user) => {
    try {
      console.log("sigh up");
      const data = await AuthApi.signUp(user);
      this.setUser = data
      console.log("🚀 ~ file: Auth.store.js ~ line 49 ~ AuthStore ~ signUp= ~ user", user)
      runInAction(async () => {
        user.password && await this.login({ mail: user.email, password: user.password })
        this.setUser= data.auth_token;
        this.errorStatus = 0
      })
    } catch (err) {
      runInAction(() => {
        console.log("🚀 ~ file: Auth.store.js ~ line 51 ~ AuthStore ~ signUp= ~ err", err)
        this.errorStatus = err.response.data.code;
        throw err
      })
    }
  };

  sendSms = async (phone, register = false) => {
    try {
      this.user.phone = phone
      const data = await AuthApi.sendSms(phone, register);
      console.log("🚀 ~ file: Auth.store.js ~ line 56 ~ AuthStore ~ sendSms= ~ data", data)
      runInAction(() => {
        this.smsResponse = { ...data, phone };
        this.errorStatus = 0;
      });
      return true;
    } catch (err) {
      console.log("🚀 ~ file: Auth.store.js ~ line 75 ~ AuthStore ~ sendSms= ~ err", err)
      runInAction(() => {
        this.errorStatus = err.response.data.code;
      });
      throw err;
      // return register ? err : false;
    }
  };

  verifySms = async (code) => {
    try {
      const { phone, shipment_id } = this.smsResponse;
      const data = await AuthApi.verifySms(code, phone, shipment_id);
      const user = await this.setUser(data.auth_token);
      return user
    } catch (err) {
      runInAction(() => {
        this.errorStatus = err.response.data.code;
      });
      return false;
    }
  };

  verifySmsRegister = async (code) => {
    try {
      const { phone, shipment_id } = this.smsResponse;
      const data = await AuthApi.verifySmsRegister(code, phone, shipment_id);
      console.log("🚀 ~ file: Auth.store.js ~ line 89 ~ AuthStore ~ verifySmsRegister= ~  data", data)
      return data
    } catch (err) {
      throw err
      // runInAction(() => {
      //   this.errorStatus = err.response.data.code;
      // });
    }
  };

  logOut = async () => {
    localStorage.clear()
    runInAction(() => { this.isLogin = false; })
  }
  login = async (body) => {
    try {
      const succses = await AuthApi.login(body);
      console.log("🚀 ~ file: Auth.store.js ~ line 109 ~ AuthStore ~ login= ~ succses", succses)
      runInAction(() => {
        this.isLogin = true
        this.errMessage = ""
      })
      // succses ? this.isLogin = true : this.isLogin = false;
    } catch (error) {
      this.errMessage = error.response.data
      throw error
    }
  }
  clearErr = () => {
    this.errMessage = "";
    this.errorStatus = ""
  }
  sendRestoreMail = async (body) => {
    console.log("🚀 ~ file: Auth.store.js ~ line 123 ~ AuthStore ~ sendRestoreMail= ~ body", body)
    try {
      return await AuthApi.restorePassMail(body)

    }
    catch (err) {
      this.errMessage = err.response.data
      console.log("🚀 ~ file: Auth.store.js ~ line 128 ~ AuthStore ~ err", err)
      throw err
    }
  }

  changePassword = async (password, token) => {
    try {
      const res = await AuthApi.newPassword(password, token)
      return await this.login({ mail: res.data, password: password })
    } catch (error) {
      throw error
    }
  }}

export default AuthStore;
