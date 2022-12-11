// import axios from "axios";
import { makeAutoObservable } from "mobx";
// import User from '../../common/models/User';
// import { UserType } from '../../common/consts/enums';
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
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 30 ~ UsersStore ~ getAllUsers= ~ error",
        error
      );
    }
  };

  getUserDetails = async () => {
    try {
      const userDetails = await UserApi.getUserDetails();
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 51 ~ UsersStore ~ getUserDetails= ~ userDetails",
        userDetails
      );
      return userDetails;
    } catch (error) {
      console.log(
        "🚀 ~ file: Users.store.jsx ~ line 52 ~ UsersStore ~ getUserDetails=async ~ error",
        error
      );
      throw error;
    }
  };
}

export default UsersStore;
