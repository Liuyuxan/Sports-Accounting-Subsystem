<template>
  <div class="team title-center center">
    <h2 class="project-title ">团队项目成绩提交</h2>
    <Form ref="formData" :model="formData.value" :label-width="80" style="width: 1000px">
      <div class="project top">
        <h2 class="name">选择信息</h2>
        <div class="project-inner">

          <FormItem label="项目">
            <Select v-model="formRef.sportId.value" @on-change="selectProject" style="width:420px">
              <Option v-for="item in teamProjectData.sportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="身份">
            <Select v-model="formRef.status.value" @on-change="selectStatus" style="width:420px">
              <Option v-for="item in infoType.status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <!-- <FormItem label="赛区">
            <Select v-model="formRef.matchType.value" @on-change="selectMatchType" style="width:250px">
              <Option v-for="item in infoType.matchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem> -->

        </div>
      </div>

      <div class="info top">
        <div class="info-title">
          <h2 class="name">填写信息</h2>
          <!-- 添加按钮 -->
          <!-- <Button type="primary" icon="md-add" class="btn" @click="addBtnClick">添加</Button> -->
        </div>
        <template v-for="(item, index) in formRef.infos.value" :key="index">
          <div class="content">
            <Row>
              <Col>
                <FormItem :label="'团队编号'+ Number(index + 1)">
                  <Input v-model="item.id" placeholder="学号" style="width: 250px" :readonly="isReadonly" />
                </FormItem>
              </Col>
              <Col>
                <FormItem :label="'团队:'">
                  <Input v-model="item.department" placeholder="学院\团队" style="width: 250px" :readonly="isReadonly" />
                </FormItem>
              </Col>
              <Col>
                <FormItem :label="'成绩:'">
                  <Input v-model="item.scores" placeholder="成绩" style="width: 210px"/>
                </FormItem>
              </Col>
              <Col>
                <Button class="deleteBtn" @click="deleteBtn(index)" size="small">删除</Button>
              </Col>
            </Row>
          </div>
        </template>
      </div>

      <div class="submit">
        <Button type="primary" class="btn" @click="submit" style="width: 100px;">提交</Button>
      </div>
    </Form>
  </div>

</template>

<script setup>
import { ref, toRefs, reactive } from 'vue'
import teamProjectData from "@/assets/data/team-project"
import infoType from "@/assets/data/type"
import { FormItem } from 'view-ui-plus';
import { useRouter } from 'vue-router';
import YXrequest from '@/services/request';
import useInfoStore from '@/stores/modules/infos';
import { storeToRefs } from 'pinia';

const currentIndex = ref(1)
const router = useRouter()
const infoStore = useInfoStore()
const { teamInfos } = storeToRefs(infoStore)
let isReadonly = true

// 响应式
const formData = reactive({
  sportId: "",
  status: "",
  matchType: "",
  infos: [
    {
      sportId: "",
      status: "",
      matchType: "",
      id: "",
      department: "",
      name: "",
      scores: "",
    },
  ]
})
const formRef = toRefs(formData)  // 使复杂的对象内部数据响应式

let flag = 0
// 选择项目完成后触发
const selectProject = () => {
  formData.infos[0].sportId = formRef.sportId.value
  console.log("项目已选择")
  requestInfo()
}
const selectStatus = () => {
  formData.infos[0].status = formRef.status.value
  console.log("身份已选择")
  requestInfo()
}
// const selectMatchType = () => {
//   formData.infos[0].matchType = formRef.matchType.value
//   console.log("赛区已选择")
//   requestInfo()
// }
const requestInfo = () => {
  if(flag !== 2) flag ++
  if(flag === 2) {
    console.log("全部选择完成")

    const sportId = formRef.sportId.value
    const matchType = formRef.matchType.value
    const status = formRef.status.value

    infoStore.fetchTeamInfosData(sportId, 1, status).then(res => {
      formData.infos = teamInfos.value.infos  // 将响应式渲染到模板上的数组替换成网络请求到的数组
    })

  }
}

// 添加数据
// const addBtnClick = () => {
//   currentIndex.value++
//   formData.infos.push({
//     sportId: formRef.sportId.value,
//     status: formRef.status.value,
//     matchType: formRef.matchType.value,
//     id: "",
//     department: "",
//     score: "",
//   })
  
//   console.log("添加一条信息", formData.infos)
// }

// 删除数据
const deleteBtn = (index) => {
  console.log("删除前：",formData.infos)
  console.log("index:",index)

  const id = formData.infos[index].teamId
  const sportId = formData.infos[index].sportId
  const classify = formData.infos[index].classify  // 赛区类型

  console.log("删除了: ", id, sportId, classify)

  YXrequest.delete({
    url: `/Team/deleteId/${id}/${sportId}/${classify}`,

  }).then(res => {
    console.log(res)
    // 发送delete请求，删除数据库中的数据
    formData.infos.splice(index, 1)
    console.log("删除了一条信息,所剩信息：",formData.infos)
  }).catch(err => {
    console.log(err)
  })

}

const result = []  // 结果保存在此，提交此数组到后端
let resultArr = [] // 上一次结果数组
let newArr = []
// 提交表单
async function submit() {
  // 循环判断成绩有数据的，只提交写了成绩的数据
  console.log("formData.infos:", formData.infos)
  for(const item of result) {
    resultArr.push(item)
  }
  // 循环判断成绩有数据的，只提交写了成绩的数据
  for (const item of formData.infos) {
    console.log(item.scores)
    if(item.scores) {
      result.push(item)
    }
  }
  console.log("提交的数组：", result)

  newArr = getArrDifference(result, resultArr)
  // 发送数据
  YXrequest.post({
    url: "/SportInfo/submit/down",
    data: result
  }).then(res => {
    console.log(res);
    // code为 0 代表团队编号错误
    if(res.code == 0) {
      const msg = res.msg.slice(10)  // 截取返回的错误的团队编号
      // result.length = 0  // 清空结果数组，保证数据的唯一性
      alert(`团队编号：${msg} 错误，请仔细检查一下团队编号：${msg} 有没有输入错误哦~`)
      return
    }

    alert("提交成功")
    router.go(0)  // 刷新页面

  }).catch(err => {
    console.log(err)
  })
}

const getArrDifference = (arr1, arr2) => {
    return arr1.concat(arr2).filter(function(v, i, arr) {

        return arr.indexOf(v) === arr.lastIndexOf(v)

    });

}

</script>

<style lang="less" scoped>
.team {
  .project {
    .project-inner {
      display: flex;
      .download {
      position: relative;
      right: -10px;
      }
    }
  }
  .info-title {
    position: relative;
    display: flex;
    align-items: center;
    width: 600px;

    .btn {
      position: absolute;
      right: -400px;
      height: 30px;
    }
  }
  .deleteBtn {
    margin-left: 6px;
    margin-top: 5px;
  }
  
  .submit {
    display: flex;
    justify-content: center;
  }
}
</style>