import axios from "axios";

const comment = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL_V1 + "/comment",
});

export { comment };
