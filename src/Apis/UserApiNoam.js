import api from "./api";

class UserApi {
  updateUser = async (user) => {
    try {
      const res = await api.put("/user/update", { user });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  getAllUsers = async () => {
    try {
      const res = await api.get("/user/");
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default new UserApi();
