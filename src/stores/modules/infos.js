import { defineStore } from "pinia";
import { getAllSportMans, getAllSports, getAllTeam } from "@/services";

const useInfoStore = defineStore("info", {
  state: () => ({
    sportNames: [],
    sportMans: [
      {
        name: "",
        number: "",
        departmentName: "",
      },
    ],
  }),

  actions: {
    // 获取项目
    async fetchAllSports(data) {
      const res = await getAllSports(data);
      this.sportNames = res.data;
      // console.log("请求个人项目结果", this.sportNames);
    },

    // 获取运动员
    async fetchAllSportMans(data) {
      const res = await getAllSportMans(data);
      this.sportMans = res.data.rows;
      // console.log("请求运动员结果", this.sportMans);
    },

     // 获取所有团队
     async fetchAllTeam(data) {
      const res = await getAllTeam(data);
      this.sportMans = res.data;
      // console.log("请求团队项目结果", this.sportNames);
    },

    // 删除运动员或团队
    deleteLine(index) {
      this.sportMans.splice(index, 1)
    }

  },
});

export default useInfoStore;
