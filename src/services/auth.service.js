import axios from "axios";

import { domain } from "../constants";

export const loginAdmin = async (values) => {
  try {
    const response = await axios.post(`${domain}/auth/login`, values);

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const refreshToken = async (refresh_token) => {
  try {
    const response = await axios.post(
      `${domain}/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
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
