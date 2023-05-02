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
  // 添加角色
  addGroup: (data) => {
    return http.post(`${baseUrl}/api/addGroup`, data);
  },
  // 更新角色
  updateGroup: (data) => {
    return http.post(`${baseUrl}/api/saveGroupRule`, data);
  },
  // 获取角色下的权限
  getGroupRuleList: (data) => {
    return http.get(`${baseUrl}/api/getGroupRuleList` + joinURLParam(data));
  },
  // 删除权限
  deleteRule: (data) => {
    return http.get(`${baseUrl}/api/deleteRule` + joinURLParam(data));
  },
  // 管理员列表
  getAdminList: (data) => {
    return http.get(`${baseUrl}/api/getAdminList` + joinURLParam(data));
  },
  // 添加管理员
  addAdmin: (data) => {
    return http.post(`${baseUrl}/api/addAdmin`, data);
  },
  // 添加管理员
  updateAdmin: (data) => {
    return http.post(`${baseUrl}/api/updateAdmin`, data);
  },
  // 删除管理员账户
  deleteAdmin: (data) => {
    return http.get(`${baseUrl}/api/deleteAdmin` + joinURLParam(data));
  },
  // 删除角色
  deleteGroup: (data) => {
    return http.get(`${baseUrl}/api/deleteGroup` + joinURLParam(data));
  },
};