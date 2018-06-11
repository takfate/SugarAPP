import axios from 'axios';
import Qs from 'qs';

const httpRequest = axios.create({
    baseURL:'http://120.27.48.66',
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
});

export default httpRequest;