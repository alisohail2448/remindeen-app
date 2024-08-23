import { POST_UPLOAD_IMAGE } from "@/constants/constants";
import { isTokenExpired } from "@/utils/helper";
import axios from "axios";

export const uploadImage = async (token, formData) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const response = await axios.post(POST_UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        return formData; 
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log("error", error);

      return { msg: "No response from server", success: false };
    } else {
      return { msg: "An unknown error occurred", success: false };
    }
  }
};
0