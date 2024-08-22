import { GET_MESSAGES } from "@/constants/constants";
import axios from "axios";

export const getMessages = async (token, adminId) => {
  try {
    const URL = `${GET_MESSAGES}${adminId}`;
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


module.exports = { getMessages }