<template>
  <div class="team title-center">
    <h2 class="project-title ">团队项目</h2>
    <Form ref="formData" :model="formData.value" :label-width="80" style="width: 680px">
      <div class="project top">
        <h2 class="name">选择项目</h2>
        <div class="project-inner">
          <FormItem label="团队项目">
            <Select v-model="formRef.sportId.value" :on-change="changeProject()" style="width:410px">
              <Option v-for="item in teamProjectData.sportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <div class="download">
            <Button type="primary" icon="md-cloud-download" class="btn" @click="download" style="width: 180px;">下载该项目Excel表格</Button>
          </div>
        </div>
      </div>

      <div class="info top">
        <div class="info-title">
          <h2 class="name">填写信息</h2>
          <Button type="primary" icon="md-add" class="btn" @click="addBtnClick">添加</Button>
        </div>
        <template v-for="(item, index) in formRef.infos.value" :key="index">
          <div class="content">
            <FormItem :label="'团队编号' + Number(index + 1)">
              <Row>
                <Col>
                  <Input v-model="item.id" placeholder="团队编号" style="width: 275px"/>
                </Col>
                <Col>
                  <Input v-model="item.score" placeholder="成绩" style="width: 275px"/>
                </Col>
                <Col>
                  <Button class="deleteBtn" @click="deleteBtn(index)" size="small">删除</Button>
                </Col>
              </Row>
            </FormItem>
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
import { FormItem } from 'view-ui-plus';
import { useRouter } from 'vue-router';
import YXrequest from '@/services/request';

const currentIndex = ref(1)

// 响应式
const formData = reactive({
  sportId: "",
  infos: [
    {
      sportId: "",
      id: "",
      score: "",
    },
  ]
})
const formRef = toRefs(formData)  // 响应式

// 选择项目完成后触发
const changeProject = () => {
  formData.infos[0].sportId = formRef.sportId.value
}

// 添加数据
const addBtnClick = () => {
  currentIndex.value++
  formData.infos.push({
    sportId: formRef.sportId.value,
    id: "",
    score: "",
  })
  
  console.log("添加一条信息", formData.infos)
}

// 删除数据
const deleteBtn = (index) => {
  formData.infos.splice(index, 1)
  console.log("删除一条信息",formData.infos)
}

const router = useRouter()

// 提交表单
const submit = () => {
  console.log(formData)
  console.log("已提交")

  YXrequest.post({
    url: "/SportInfo/submit/down",
    data: formData.infos
  }).then(res => {
    console.log(res);
    downloadExcel(res.data)

    alert("提交成功")
    router.go(0)  // 刷新页面

  })
}

// 下载所有项目的表格
const download = () => {
  // 发送数据
  YXrequest.get({
    url: `/Excel/download/${formData.sportId}`,
  }).then(res => {
    console.log(res);
    downloadExcel(res.data)

  })
  
  console.log("下载" + formData.sportId + "号项目Excel表格")
}

const downloadExcel = (UUID) => {
  console.log("111", UUID)
  window.open(`http://192.168.116.17:8080/Excel/download/getExcel/${UUID}`)
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
      right: -80px;
      height: 30px;
    }
  }
  .deleteBtn {
    margin-left: 6px;
  }
  
  .submit {
    display: flex;
    justify-content: center;
  }
}
</style>