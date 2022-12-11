import { makeAutoObservable } from "mobx";
import UserApi from "../Apis/UserApi";

class UsersStore {
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateUser = async () => {
    try {
      const data = await UserApi.updateUser(this.user);
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 17 ~ UsersStore ~ updateUser= ~ data",
        data
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 19 ~ UsersStore ~ updateUser ~ err",
        err
      );
    }
  };

  getAllUsers = async () => {
    try {
      const users = await UserApi.getAllUsers();
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 25 ~ UsersStore ~ getAllUsers= ~ users",
        users
      );
      return users;
    } catch (error) {
      console.log("🚀 ~ file: Users.store.js ~ line 35 ~ UsersStore ~ getAllUsers= ~ error", error)

    }
  };
}

export default UsersStore;
