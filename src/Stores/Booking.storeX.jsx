import { makeAutoObservable } from 'mobx';

import BookingApi from '../Apis/BookingApi';

class BookingsStore {
	booking = {};

    constructor() {
        makeAutoObservable(this);
    }

	updateBooking = async ()=> {
		try {
			const data = await BookingApi.updateBooking(this.booking)
            console.log("🚀 ~ file: Booking.store.jsx ~ line 17 ~ BookingStore = ~ data", data)
		}
		catch (err) {
        	console.log("🚀 ~ file: Booking.store.jsx ~ line 19 ~ BookingStore ~ err", err)
		}
	}

}

export default BookingsStore;