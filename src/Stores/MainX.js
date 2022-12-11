import UsersStore from "./Users.store";
import AuthStore from "./AuthStore";
// import api from "../Apis/api";

/**
 * Initiate all stores
 */
const usersStore = new UsersStore();
const authStore = new AuthStore();



/**
 * Save the instance in global object
 */
const rootStores = {
  USERS_STORE: usersStore,
  AUTH_STORE: authStore,
};

export default rootStores;
