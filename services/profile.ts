import { GET_USER_PROFILE, POST_CREATE_ACCOUNT, POST_LOGIN_USER } from "@/constants/constants";
import axios from "axios";

export const getUser = async (token, userId) => {
  try {
    const URL = `${GET_USER_PROFILE}${userId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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