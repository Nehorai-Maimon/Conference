import { api } from "./index";

class UserApi {
  updateUser = async (user) => {
    try {
      const res = await api.put("/user/update", { user });
      return res.data;
    } catch (err) {
      console.log(
        "🚀 ~ file: UserApi.jsx ~ line 14 ~ UserApi ~ updateUser= ~ err",
        err
      );
      throw err;
    }
  };
  getAllUsers = async () => {
    try {
      const res = await api.get("/user/");
      return res.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: UserApi.jsx ~ line 21 ~ UserApi ~ getAllUsers=async ~ error",
        error
      );
      throw error;
    }
  };

  getUserDetails = async () => {
    try {
      const res = await api.get("/user/oneUser");
      console.log("ress", res);
      return res.data;
    } catch (e) {
      console.log(
        "🚀 ~ file: UserApi.jsx ~ line 39 ~ UserApi ~ getUserDetails=async ~ e",
        e
      );

      throw e;
    }
  };
}

export default new UserApi();
