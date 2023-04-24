import { defineStore } from 'pinia'
import { getStudentRankInfos, getTeacherRankInfos, getInfos, getTeamInfos } from "@/services"

const useInfoStore = defineStore('info', {
  state: () => ({
    studentRankInfos: [],
    teacherRankInfos: [],
    sportsManInfos: [],
    teamInfos: [{
      id: 123454
    }]
  }),

  actions: {
    // 请求学生项目排名信息,type表示比赛类型:预赛或决赛
    async fetchStudentRankInfosData(sportId, type) {
      const res = await getStudentRankInfos(sportId, type)
      this.studentRankInfos = res.data
      console.log(res.data)
    },

    // 请求职工项目排名信息
    async fetchTeacherRankInfosData(sportId, type) {
      const res = await getTeacherRankInfos(sportId, type)
      this.teacherRankInfos = res.data
      console.log(res.data)
    },

    // 请求运动员信息
    async fetchSportsManInfosData(id, type, status) {
      const res = await getInfos(id, type, status)
      this.sportsManInfos.infos = res.data
      console.log(res.data)
    },

    // 请求团队信息
    async fetchTeamInfosData(id, type, status) {
      const res = await getTeamInfos(id, type, status)
      this.teamInfos.infos = res.data
      console.log(res.data)
    },
  }
})

export default useInfoStore

