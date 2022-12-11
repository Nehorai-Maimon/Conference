import { loginApi } from "./api";
// I DON'T THINK SOMEONE USE THIS FILE
class AuthApi {
  signUp = async (user) => {
    const res = await loginApi.post("/authuser/register", user);
    return res.data;
  };

  /**
   * @param {string} phone
   */
  sendSms = async (phone) => {
    const res = await loginApi.post("/authuser/sendsms", { phone });
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
    const res = await loginApi.post("/authuser/verify", {
      phone,
      code,
      shipment_id,
    });
    const data = res.data;
    return data;
  };
}

export default new AuthApi();
