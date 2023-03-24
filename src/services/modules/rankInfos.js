import YXrequest from "../request"

// 请求学生项目排名信息
export function getStudentRankInfos(sportId, type) {
  console.log(sportId, type)
  return YXrequest.get({
    url: `/SportInfo/personal/${sportId}/${type}/学生`,
  })
}
// 请求职工项目排名信息
export function getTeacherRankInfos(sportId, type) {
  console.log(sportId, type)
  return YXrequest.get({
    url: `/SportInfo/personal/${sportId}/${type}/职工`,
  })
}

// 请求个人运动员数据
export function getInfos(id, type, status) {
  console.log(id, type, status)
  return YXrequest.get({
    url: `/Athlete/getAllInfo/${id}/${type}/${status}`,
  })
}

// 请求团队数据
export function getTeamInfos(id, type, status) {
  console.log(id, type, status)
  return YXrequest.get({
    url: `/Team/getAllTeamInfo/${id}/${type}/${status}`,
  })
}

