<template>

  <div class="rank title-center">
    <h2 class="project-title ">教职工项目成绩查询</h2>
    <div class="project top">
      <h2 class="name">选择项目</h2>
      <Select v-model="sportId" style="width:550px">
        <OptionGroup label="个人径赛">
          <Option v-for="item in teacherSports.sportList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
        <OptionGroup label="个人田赛">
          <Option v-for="item in teacherSports.sportList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
        <OptionGroup label="团队项目">
          <Option v-for="item in teacherSports.sportList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
      </Select>

      <h2 class="matchType">选择赛区</h2>
      <Select v-model="matchType" style="width:550px">
        <Option v-for="item in infoType.matchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="button">
      <div class="submit">
        <Button type="primary" class="btn" @click="search" style="width: 100px;">查询</Button>
      </div>
      <div class="download">
        <Button type="primary" class="btn" @click="download" style="width: 100px;">下载Excel</Button>
      </div>
    </div>
    <!-- 查询后的表格展示 -->
    <!-- 个人径赛 -->
    <div v-if="isShowPersonalTrackList" class="rank-info">
      <table>
        <thead>
          <tr>
            <template v-for="item in personalTrackColumns" :key="item.key">
              <th>{{ item.title }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in teacherRankInfos" :key="item.id">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.department }}</td>
              <!-- <td>{{ item.specialty }}</td>
              <td>{{ item.classes }}</td> -->
              <td>{{ item.scores }}</td>
              <td>{{ item.ranking }}</td>
              <!-- <td>{{ item.integral }}</td> -->
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- 个人田赛 -->
    <div v-if="isShowPersonalFieldEventsList" class="rank-info">
      <table>
        <thead>
          <tr>
            <template v-for="item in personalFieldEventsList" :key="item.key">
              <th>{{ item.title }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in teacherRankInfos" :key="item.id">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.department }}</td>
              <!-- <td>{{ item.specialty }}</td>
              <td>{{ item.classes }}</td> -->
              <td>{{ item.scores }}</td>
              <td>{{ item.ranking }}</td>
              <!-- <td>{{ item.integral }}</td> -->
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- 团队比赛 -->
    <div v-if="isShowTeamTrackList" class="rank-info">
      <table>
        <thead>
          <tr>
            <template v-for="item in teamColumns" :key="item.key">
              <th>{{ item.title }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in teacherRankInfos" :key="item.id">
            <tr>
              <td>{{ item.department }}</td>
              <td>{{ item.scores }}</td>
              <td>{{ item.ranking }}</td>
              <!-- <td>{{ item.integral }}</td> -->
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script setup>
import teacherSports from "@/assets/data/teacher-sports"
import useInfoStore from "@/stores/modules/infos"
import personalProjectData from "@/assets/data/personal-project"
import { storeToRefs } from "pinia";
import { ref } from "vue";
import mockRank from "@/mock/mock-rank"  // 引入模拟的数据
import personalTrackColumns from "@/assets/data/personal-track-rank-columns"
import personalFieldEventsList from "@/assets/data/personal-fieldevents-rank-columns"
import teamColumns from "@/assets/data/team-track-rank-columns"
import infoType from "@/assets/data/type"
import YXrequest from '@/services/request';

const infoStore = useInfoStore()
const { teacherRankInfos } = storeToRefs(infoStore)

const sportId = ref()
const matchType = ref()

let isShowPersonalTrackList = ref(false)
let isShowPersonalFieldEventsList = ref(false)
let isShowTeamTrackList = ref(false)


  // 查询
const search = () => {
  const sportIdd = sportId.value
  showColumns(sportIdd)

  console.log("项目：", sportId.value, "赛区：", matchType.value)

  // 调用pinia中封装的fetchRankInfosData方法,更改rankinfo文件中存储的排名信息
  infoStore.fetchTeacherRankInfosData(sportId.value, matchType.value)

}

// 下载Excel
const download = () => {
  console.log("下载,项目：", sportId.value, "赛区:", matchType.value)
  // 发送数据
  YXrequest.get({
    url: `/Excel/download/${sportId.value}/${matchType.value}/职工`,
  }).then(res => {
    console.log("res:", res);
    downloadExcel(res.data)

  }).catch(err => {
    console.log("err:", err)
  })

}

const downloadExcel = (UUID) => {
  console.log("111", UUID)
  window.open(`http://47.120.10.1:7890/Excel/download/getExcel/${UUID}`)
}

// 展示表头字段
const showColumns = (sportIdd) => {
  if (sportIdd <= 12) {
    if(isShowPersonalTrackList.value === true) return

    isShowPersonalTrackList.value = true
    isShowTeamTrackList.value = false
    isShowPersonalFieldEventsList.value = false

  }else if(sportIdd > 12 && sportIdd < 23) {
    if(isShowPersonalFieldEventsList.value === true) return

    isShowPersonalFieldEventsList.value = true
    isShowPersonalTrackList.value = false
    isShowTeamTrackList.value = false

  } else if(sportIdd >= 23) {
    if(isShowTeamTrackList.value === true) return

    isShowTeamTrackList.value = true
    isShowPersonalTrackList.value = false
    isShowPersonalFieldEventsList.value = false
  }
}

</script>

<style lang="less" scoped>
table {
  
  border-collapse: collapse;

  tr {
  margin: 50px 0 ;
  border-bottom: 1px solid #e8eaec;
  }

  th, td {
  padding: 10px;
  width: 400px;
  text-align: center;
  }

  thead {
  background-color: #f8f8f9;
  font-size: 20px;
  }
}
.rank-info {
  margin: 44px 0;
  font-size: 16px;
}
.matchType {
  margin-top: 22px;
}
.button {
  display: flex;
  .btn {
    margin: 0 20px;
  }
}
</style>