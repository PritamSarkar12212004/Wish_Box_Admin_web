import axios from "axios";
import AxiosConfig from "../../config/axios/Axios.config";
const api = axios.create(AxiosConfig);
export default api;
