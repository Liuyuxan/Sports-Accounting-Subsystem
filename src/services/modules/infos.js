/*
 * @Author: 秋意微醺时
 * @Date: 2023-03-29 09:54:59
 * @Description: 网络请求列表
 */
import YXrequest from "../request";

// 获取所有个人项目信息
export function getAllSports(data = {}) {
  return YXrequest.post({
    url: '/match',
    data
  })
}

// 获取运动员
export function getAllSportMans(data = {}) {
  return YXrequest.post({
    url: `/athletes?page=${1}&pageSize=${500}`,
    data
  })
}

// 获取所有团队信息
export function getAllTeam(data = {}) {
  return YXrequest.post({
    url: '/team',
    data
  })
}

// 提交个人成绩
export function sumbitMansScore(data = {}) {
  return YXrequest.post({
    url: `/athletes/update`,
    data
  })
}
// 提交团队成绩
export function sumbitTeamScore(data = {}) {
  return YXrequest.post({
    url: `/team/update`,
    data
  })
}

// 下载表格,status代表身份，1学生/2教职工，字符型
export function downloadExcelTable(data, status) {
  return YXrequest.post({
    url: `/download?identity=${status}`,
    data
  })
}

// 增加运动员
export function addSportMan(data) {
  return YXrequest.post({
    url: `/athletes/add`,
    data
  })
}

// 删除运动员
export function deleteSportMan(data) {
  return YXrequest.post({
    url: '/athletes/delete',
    data
  })
}

// 删除团队
export function deleteTeam(id) {
  return YXrequest.post({
    url: `/team/delete?id=${id}`
    
  })
}

