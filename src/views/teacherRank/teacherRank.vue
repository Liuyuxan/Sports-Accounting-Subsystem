<template>

  <div class="rank title-center">
    <h2 class="project-title ">教职工项目排名查询</h2>
    <div class="project top">
      <h2 class="name">选择项目</h2>
      <Select v-model="sportId" style="width:600px">
        <OptionGroup label="个人径赛">
          <Option v-for="item in allSportsData.sportList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
        <OptionGroup label="个人田赛">
          <Option v-for="item in allSportsData.sportList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
        <OptionGroup label="团队项目">
          <Option v-for="item in allSportsData.sportList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
      </Select>
    </div>
    <div class="submit">
      <Button type="primary" class="btn" @click="submit" style="width: 100px;">查询</Button>
    </div>

    <!-- 查询后的表格展示 -->
    <div v-if="isShowPersonalList" class="rank-info">
      <table>
        <thead>
          <tr>
            <template v-for="item in personalColumns" :key="item.key">
              <th>{{ item.title }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in rankInfos" :key="item.id">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.department }}</td>
              <td>{{ item.specialty }}</td>
              <td>{{ item.classes }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.ranking }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-if="isShowTeamList" class="rank-info">
      <table>
        <thead>
          <tr>
            <template v-for="item in teamColumns" :key="item.key">
              <th>{{ item.title }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in rankInfos" :key="item.id">
            <tr>
              <td>{{ item.department }}</td>
              <td>{{ item.specialty }}</td>
              <td>{{ item.classes }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.ranking }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script setup>
import allSportsData from "@/assets/data/all-sports"
import useRankStore from "@/stores/modules/rankInfos";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import mockRank from "@/mock/mock-rank"  // 引入模拟的数据
import personalColumns from "@/assets/data/personal-rank-columns"
import teamColumns from "@/assets/data/team-rank-columns"
import YXrequest from '@/services/request';

const rankStore = useRankStore()
const { rankInfos } = storeToRefs(rankStore)

console.log(rankInfos)

const sportId = ref()
let isShowPersonalList = ref(false)
let isShowTeamList = ref(false)

  // 提交项目id查询成绩
const submit = () => {
  const sportIdd = sportId.value

  console.log(sportIdd)
  if (sportIdd < 23) {

    if(isShowTeamList.value === true) isShowTeamList.value = !isShowTeamList.value
    if(isShowPersonalList.value === true) return
    isShowPersonalList.value = !isShowPersonalList.value

  } else if(sportIdd >= 23) {

    if(isShowPersonalList.value === true) isShowPersonalList.value = !isShowPersonalList.value
    if(isShowTeamList.value === true) return
    isShowTeamList.value = !isShowTeamList.value

  }

  console.log("已提交", sportId.value)

  // 调用pinia中封装的fetchRankInfosData方法,更改rankinfo文件中存储的排名信息
  rankStore.fetchRankInfosData(sportId.value)

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
</style>

