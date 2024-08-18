import { POST_UPLOAD_IMAGE } from "@/constants/constants";
import axios from "axios";

export const uploadImage = async (token, formData) => {
    try {
      const URL = `${POST_UPLOAD_IMAGE}`; // Make sure POST_UPLOAD_IMAGE is the correct endpoint
      const response = await axios.post(URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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