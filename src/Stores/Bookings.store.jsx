import { makeAutoObservable } from "mobx";
import moment from "moment";
import BookingApi from "../Apis/BookingApi";

class BookingsStore {
  constructor() {
    makeAutoObservable(this);
  }

  currentBooking = {
    _id: null,
    startMeeting: null,
    endMeeting: null,
    roomId: null,
    userId: null,
  };

  newBooking = {
    date: null,
    startHour: null,
    endHour: null,
    people: null,
    room: "לא משנה החדר",
  };

  bookings = [];

  setStartDate = (date) => {
    this.newBooking.date = date;
  };
  setStartHour = (hour) => {
    const time = new Date(moment(hour, "hh:mm"));
    const defaultDurationHalfHour = 1800000; //ms
    time.setDate(this.newBooking.date.getDate());
    this.newBooking.startHour = time;
    this.newBooking.endHour = new Date(
      time.getTime() + defaultDurationHalfHour
    );
  };
  setEndHour = (meetingDuration) => {
    this.newBooking.endHour = new Date(
      this.newBooking.startHour.getTime() + meetingDuration
    );
  };
  setPickedRoom = (room) => {
    room
      ? (this.newBooking.room = room.value)
      : (this.newBooking.room = "לא משנה החדר");
  };
  getAllBookings = async () => {
    try {
      const bookings = await BookingApi.getAllBookings();
      this.bookings = bookings;
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 54 ~ BookingsStore ~ getAllBookings= ~ bookings",
        bookings
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  getAllBookingsByUser = async (id) => {
    try {
      const bookings = await BookingApi.getAllBookingsByUser(id);
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 32 ~ BookingsStore ~ getAllBookingsByUser= ~ bookings",
        bookings
      );
      this.bookings = bookings;
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  setCurrentBooking = (booking) => {
    this.currentBooking = booking;
  };

  deleteBooking = async (id) => {
    try {
      const deleteBooking = await BookingApi.deleteBooking(id);
      // this.booking = deleteBooking;
      console.log("bookings1234", deleteBooking);
      return deleteBooking;
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  getAllRooms = async () => {
    try {
      const rooms = await BookingApi.getAllRooms();
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 19 ~ BookingsStore ~ getAllRooms= ~ Rooms",
        rooms
      );
      return rooms;
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRooms= ~ err",
        err
      );
    }
  };

  getAllRoomsForSelectBox = async () => {
    try {
      const namesOfRooms = await BookingApi.getAllNamesOfTheRooms();
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 19 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ namesOfRooms",
        namesOfRooms
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 21 ~ BookingsStore ~ getAllRoomsForSelectBox= ~ err",
        err
      );
    }
  };

  getOptionalRooms = async () => {
    try {
      const rooms = await BookingApi.getOptionalRooms(this.booking);
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 14 ~ BookingsStore ~ getOptionalRooms= ~ rooms",
        rooms
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: Bookings.store.jsx ~ line 16 ~ BookingsStore ~ getOptionalRooms= ~ err",
        err
      );
    }
  };
  updateBooking = async () => {
    try {
      const data = await BookingApi.updateBooking(this.booking);
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
}

export default BookingsStore;
