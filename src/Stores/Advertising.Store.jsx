import { makeAutoObservable } from "mobx";
import AdvertisingApi from "../Apis/Advertising.Api";

class AdvertisingStore {
  // advertising = {
  //   name: null,
  //   startDate: null,
  //   endDate: null,
  //   endHour: null,
  //   imageUrl: null,
  //   link: null,
  // };

  advertisement = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllAdvertising = async () => {
    try {
      const advertisings = await AdvertisingApi.getAllAdvertising();
      this.advertisement = advertisings;
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  updateAdvertising = async () => {
    try {
      const data = await AdvertisingApi.updateAdvertising(this.advertising);
      console.log(
        "🚀 ~ file: Booking.store.jsx ~ line 17 ~ BookingStore = ~ data",
        data
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: Booking.store.jsx ~ line 19 ~ BookingStore ~ err",
        err
      );
    }
  };

  deleteBooking = async (id) => {
    try {
      const deleteAdvertising = await AdvertisingApi.deleteAdvertising(id);
      // this.booking = deleteBooking;
      console.log("advertising", deleteAdvertising);
      return deleteAdvertising;
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  //   getAllRoomsForSelectBox = async () => {
  //     try {
  //       const namesOfRooms = await AdvertisingApi.getAllNamesOfTheRooms();
  //       console.log(
  //         "🚀 ~ file: Bookings.store.jsx ~ line 19 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ namesOfRooms",
  //         namesOfRooms
  //       );
  //     } catch (err) {
  //       console.log(
  //         "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
  //         err
  //       );
  //     }
  //   };

  //   getOptionalRooms = async () => {
  //     try {
  //       const rooms = await AdvertisingApi.getOptionalRooms(this.booking);
  //       console.log(
  //         "🚀 ~ file: Bookings.store.jsx ~ line 14 ~ BookingsStore ~ getOptionalRooms= ~ rooms",
  //         rooms
  //       );
  //     } catch (err) {
  //       console.log(
  //         "🚀 ~ file: Bookings.store.jsx ~ line 16 ~ BookingsStore ~ getOptionalRooms= ~ err",
  //         err
  //       );
  //     }
  //   };
}

export default AdvertisingStore;
