import axios from 'axios';
import Qs from "qs";
import {BaseUrl} from './config';

const httpRequest = axios.create({
    baseURL:BaseUrl,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
});

export default httpRequest;