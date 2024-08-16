import { POST_CREATE_ACCOUNT, POST_LOGIN_USER } from "@/constants/constants";
import axios from "axios";

export const createAccount = async (accountData) => {
    try {
      const response = await axios.post(POST_CREATE_ACCOUNT, accountData);
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

  export const loginUser = async (values) => {
    try {
      const response = await axios.post(POST_LOGIN_USER, values);
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