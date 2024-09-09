import { POST_SEND_OTP, POST_LOGIN_USER } from "@/constants/constants";
import axios from "axios";

export const sendOtp = async (data) => {
    try {
        const response = await axios.post(POST_SEND_OTP, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { msg: "No response from server", success: false };
      } else {
        return { msg: "An unknown error occurred", success: false };
      }
    }
  };

  export const signInApi = async (data) => {
    try {
      const response = await axios.post(POST_LOGIN_USER, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { message: "No response from server", success: false };
      } else {
        return { message: "An unknown error occurred", success: false };
      }
    }
  }
  