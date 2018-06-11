import Qs from "qs";

const axiosConfig  = {
    baseURL:'http://120.27.48.66',
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
};
export default axiosConfig;