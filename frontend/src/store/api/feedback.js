import axios from "axios";

const feedback = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL_V1 + "/feedback",
});

export { feedback };
