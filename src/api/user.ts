import { http } from "/@/plugins/request";
import config from '/@/config/index';
import { joinURLParam } from "/@/utils";

const baseUrl = config.baseUrl;

export default {
  adminLogin: (data) => {
    return http.post(`${baseUrl}/login`, data);
  },
  getRuleList: (data) => {
    return http.get(`${baseUrl}/api/getRuleList${joinURLParam(data)}`, data);
  },
  ruleAuthFindById: (data) => {
    return http.get(`${baseUrl}/api/ruleAuthFindById${joinURLParam(data)}`, data);
  },
};