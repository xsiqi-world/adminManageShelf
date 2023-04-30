import { http } from "/@/plugins/request";
import config from '/@/config/index';
import { joinURLParam } from "/@/utils";

const baseUrl = config.baseUrl;

export default {
  // 登录
  adminLogin: (data) => {
    return http.post(`${baseUrl}/login`, data);
  },
  // 权限列表
  getRuleList: (data) => {
    return http.get(`${baseUrl}/api/getRuleList${joinURLParam(data)}`, data);
  },
  // 查询菜单下的权限
  ruleAuthFindById: (data) => {
    return http.get(`${baseUrl}/api/ruleAuthFindById${joinURLParam(data)}`, data);
  },
  // 添加权限菜单
  addRule: (data) => {
    return http.post(`${baseUrl}/api/addRule`, data);
  },
  // 更新权限菜单
  updateRule: (data) => {
    return http.post(`${baseUrl}/api/updateRule`, data);
  },
  // 角色列表
  getGroupList: (data) => {
    return http.get(`${baseUrl}/api/getGroupList${joinURLParam(data)}`, data);
  },
  // 更新角色
  updateGroup: (data) => {
    return http.post(`${baseUrl}/api/saveGroupRule`, data);
  },
  // 更新角色
  getGroupRuleList: (data) => {
    return http.get(`${baseUrl}/api/getGroupRuleList` + joinURLParam(data));
  },
  // 删除权限
  deleteRule: (data) => {
    return http.get(`${baseUrl}/api/deleteRule` + joinURLParam(data));
  }
};