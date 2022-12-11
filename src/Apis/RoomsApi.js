import axios from "axios";
import ClientConfig from "../Common/Config";

class BookingApi {
    getOptionalRooms = async (booking) => {
        try {
            const res = await axios.post(ClientConfig.apiBaseHost + "/booking/availableRoom", { booking }, {
                headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("auth_token") },
            });
            return res.data;
        } catch (err) {
            console.log("🚀 ~ file: BookingApi.jsx ~ line 12 ~ BookingApi ~ getOptionalRooms= ~ err", err)
            throw err;
        }
    }

    getAllNamesOfTheRooms = async () => {
        try {
            const res = await axios.get(ClientConfig.apiBaseHost + "/room");
            return res.data;
        } catch (err) {
            console.log("🚀 ~ file: BookingApi.jsx ~ line 22 ~ BookingApi ~ getAllNamesOfTheRooms= ~ err", err)
            throw err;
        }
    }
}

export default new BookingApi();
