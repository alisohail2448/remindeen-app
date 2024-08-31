import {
  GET_MY_ADMIN,
  GET_REGULAR_USERS,
  GET_SUB_ADMIN,
  GET_USER_PROFILE,
  POST_ADD_USER,
  POST_LOGIN_USER,
  POST_REMOVE_USER,
  PUT_USER_PROFILE,
} from "@/constants/constants";
import { isTokenExpired } from "@/utils/helper";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getUser = async (token, userId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };

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

export const updateUser = async (token, userId, data) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const URL = `${PUT_USER_PROFILE}${userId}`;
    const response = await axios.put(
      URL,
      { updates: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const getSubAdmin = async (token, adminId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const URL = `${GET_SUB_ADMIN}${adminId}`;
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

export const getRegularusers = async (token, adminId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const URL = `${GET_REGULAR_USERS}${adminId}`;
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

export const getMyAdmin = async (token, userId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const URL = `${GET_MY_ADMIN}${userId}`;
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

export const addUser = async (token, data) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const response = await axios.post(POST_ADD_USER, data, {
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

export const removeUser = async (token, userId, adminId) => {
  const tokenExpired = await isTokenExpired(token);
  if (tokenExpired) return { msg: "Session expired, please sign in again", success: false };
  try {
    const url = `${POST_REMOVE_USER}${adminId}/user/${userId}`;
    const response = await axios.delete(url, {
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
