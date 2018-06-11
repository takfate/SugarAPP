import axios from 'axios';
import axiosConfig from './httpRequest';

const httpRequest = axios.create(axiosConfig);

export default httpRequest;