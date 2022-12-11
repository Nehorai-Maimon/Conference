// import ClientConfig from "../Common/Config";
import { api } from "./index";

class AuthApi {
  login = async (body) => {
    try {
      const res = await api.post("/general/login", body);
      console.log(
        "🚀 ~ file: AuthApi.jsx ~ line 11 ~ AuthApi ~ login= ~ res",
        res
      );
      localStorage.setItem("auth_token", `${res.data.auth_token}`);
      api.defaults.headers.common[
        "Authorization"
      ] = `bearer ${res.data.auth_token}`;
      return true;
    } catch (error) {
      throw error;
    }
  };

  signUp = async (user) => {
    const res = await api.post("/authuser/register", user);
    return res.data;
  };

  /**
   * @param {string} phone
   */
  sendSms = async (phone, register = false) => {
    console.log("🚀 ~ file: AuthApi.jsx ~ line 32 ~ AuthApi ~ sendSms= ~ phone", phone)
    const res = await api.post(`/authuser/sendsms/${register}`, { phone });
    console.log("🚀 ~ file: AuthApi.jsx ~ line 30 ~ AuthApi ~ sendSms= ~ res", res)
    /**
     * @type {SMSResponse}
     */
    const data = res.data;
    return data;
  };

  /**
   * @param {string} code
   * @param {string} phone
   * @param {string} shipment_id
   */
  verifySms = async (code, phone, shipment_id) => {
    const res = await api.post("/authuser/verify", {
      phone,
      code,
      shipment_id,
    });
    console.log("🚀 ~ file: AuthApi.jsx ~ line 53 ~ AuthApi ~ verifySms= ~ res", res)
    const data = res.data;
    api.defaults.headers.common["Authorization"] = `bearer ${data.auth_token}`;
    return data;
  };


  verifySmsRegister = async (code, phone, shipment_id) => {
    try {
      const res = await api.post("/authuser/verify-sms-register", {
        phone,
        code,
        shipment_id,
      });
      const data = res.data;
      return res;
    } catch (err) {
      console.log("🚀 ~ file: AuthApi.jsx ~ line 64 ~ AuthApi ~ verifySmsRegister= ~ e", err)
      throw err

    }
  };

  restorePassMail = async (body) => {
    try {
      const res = await api.post("authuser/forgot-password", body);
      return res
    } catch (err) {
      throw err
    }
  }
  newPassword = async (password, token) => {
    try {
      const body = { password, token }
      const res = await api.post("authuser/change-password", body);
      return res
    } catch (err) {
      throw err
    }
  }
}

export default new AuthApi();
