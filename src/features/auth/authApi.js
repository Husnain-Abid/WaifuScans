// src/features/auth/authAPI.js
import axios from "axios";
import {BASE_URL} from "../../utils/apiURL";

export const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return response.data; // assuming { user: {...}, token: "..." }
};
