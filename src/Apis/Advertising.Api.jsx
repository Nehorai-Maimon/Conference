import axios from "axios";
import ClientConfig from "../Common/Config.ts";

class AdvertisingApi {
  getAllAdvertising = async () => {
    try {
      const res = await axios.get(ClientConfig.apiBaseHost + "/advertisement");
      return res.data;
    } catch (err) {
      console.log(
        "🚀 ~ file: BookingApi.jsx ~ line 22 ~ BookingApi ~ getAllNamesOfTheRooms= ~ err",
        err
      );
      throw err;
    }
  };

  deleteAdvertising = async (id) => {
    try {
      const res = await axios.delete(
        ClientConfig.apiBaseHost + `/advertisement/${id}`
      );
      console.log("dataofbook", res);
      return res.data;
    } catch (err) {
      console.log(
        "🚀 ~ file: BookingApi.jsx ~ line 22 ~ BookingApi ~ getAllNamesOfTheRooms= ~ err",
        err
      );
      throw err;
    }
  };

  //   getOptionalRooms = async (booking) => {
  //     try {
  //       const res = await axios.post(
  //         ClientConfig.apiBaseHost + "/booking/availableRoom",
  //         { booking },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: localStorage.getItem("auth_token"),
  //           },
  //         }
  //       );
  //       return res.data;
  //     } catch (err) {
  //       console.log(
  //         "🚀 ~ file: BookingApi.jsx ~ line 12 ~ BookingApi ~ getOptionalRooms= ~ err",
  //         err
  //       );
  //       throw err;
  //     }
  //   };

  //   getAllNamesOfTheRooms = async () => {
  //     try {
  //       const res = await axios.get(ClientConfig.apiBaseHost + "/room");
  //       return res.data;
  //     } catch (err) {
  //       console.log(
  //         "🚀 ~ file: BookingApi.jsx ~ line 22 ~ BookingApi ~ getAllNamesOfTheRooms= ~ err",
  //         err
  //       );
  //       throw err;
  //     }
  //   };
}

export default new AdvertisingApi();
