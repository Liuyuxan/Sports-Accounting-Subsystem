import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getRankInfos } from "@/services"

const useRankStore = defineStore('rank', {
  state: () => ({
    rankInfos: []
  }),

  actions: {
    // 获取排名信息
    async fetchRankInfosData(sportId) {
      const res = await getRankInfos(sportId)
      this.rankInfos = res.data
      console.log(res.data)
    }
  }
})

export default useRankStore