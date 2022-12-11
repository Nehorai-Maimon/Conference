import UsersStore from "./Users.store";
import AuthStore from "./Auth.store";
import BookingsStore from "./Bookings.store";
import AdvertisingStore from "./Advertising.Store";

/**
 * Initiate all stores
 */
const usersStore = new UsersStore();
const authStore = new AuthStore();
const bookingStore = new BookingsStore();
const advertisingStore = new AdvertisingStore();

/**
 * Save the instance in global object
 */
const rootStores = {
  USERS_STORE: usersStore,
  AUTH_STORE: authStore,
  BOOKINGS_STORE: bookingStore,
  ADVERTISING_STORE: advertisingStore,
};

export default rootStores;
