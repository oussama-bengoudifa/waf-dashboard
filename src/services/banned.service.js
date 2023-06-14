import axios from "axios";

import { domain } from "../constants";

export const getBanned = async (access_token) => {
  try {
    const response = await axios.get(`${domain}/banned`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const createBanned = async (access_token, data) => {
  const formData = new FormData();
  formData.append("ipAddress", data?.ipAddress);
  formData.append("date", data?.date);
  formData.append("userAgent", data?.userAgent);
  formData.append("file", data?.file);
  formData.append("requestId", data?.requestId);
  try {
    const response = await axios.post(`${domain}/banned`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const updateBanned = async (access_token, data) => {
  const formData = new FormData();
  formData.append("ipAddress", data?.ipAddress);
  formData.append("date", data?.date);
  formData.append("userAgent", data?.userAgent);
  formData.append("file", data?.file);
  formData.append("requestId", data?.requestId);
  try {
    const response = await axios.patch(
      `${domain}/banned/${data?.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const deleteBanned = async (access_token, id) => {
  try {
    const response = await axios.delete(
      `${domain}/banned/${id}`,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};
