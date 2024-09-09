import { GET_MESSAGES } from "@/constants/constants";
import { isTokenExpired } from "@/utils/helper";
import axios from "axios";

export const getMessages = async (token, adminId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
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

export const sendMessage = async (token, adminId, data) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const URL = `${GET_MESSAGES}${adminId}`;
    const response = await axios.post(URL, data, {
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


module.exports = { getMessages, sendMessage }