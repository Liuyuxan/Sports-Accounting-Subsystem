
<template>
  <div class="personal title-center">
    <h2 class="project-title ">个人项目</h2>
    <Form ref="formData" :model="formData.value" :label-width="50" style="width: 650px">
      <div class="project top">
        <h2 class="name">选择项目</h2>
        <div class="project-inner">
          <FormItem label="项目">
          <Select v-model="formRef.project.value" style="width:410px">
            <OptionGroup label="径赛">
              <Option v-for="item in personalProjectData.sportList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="田赛">
              <Option v-for="item in personalProjectData.sportList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
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
            <FormItem :label="'学号' + Number(index + 1)">
              <Row>
                <Col>
                  <Input v-model="item.number" placeholder="学号" style="width: 275px"/>
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
import personalProjectData from "@/assets/data/personal-project"
import { FormItem } from 'view-ui-plus';
import YXrequest from '@/services/request';
import { useRouter } from 'vue-router';
import axios from 'axios';

const currentIndex = ref(1)

// 响应式
const formData = reactive({
  project: "",
  infos: [
    {
      number: "",
      score: "",
    },
  ]
})
const formRef = toRefs(formData)  // 使复杂的对象内部数据响应式

// 添加数据
const addBtnClick = () => {
  currentIndex.value++
  formData.infos.push({
    number: "",
    score: "",

  })
  console.log("添加一条信息,所有信息：", formData.infos)
}

// 删除
const deleteBtn = (index) => {
  formData.infos.splice(index, 1)
  console.log("删除了一条信息,所剩信息：",formData.infos)
}



// 提交
const submit = () => {
  console.log(formData)
  console.log("已提交")
  // alert("提交成功")  // 提示用户信息已提交
  // router.go(0)  // 刷新页面

  // 发送数据
  YXrequest.post({
    url: "/SportInfo/submit/down",
    data: formData
  }).then(response => {
    console.log(response);
  })

  // 原生axios发送网络请求
  // axios({
  //       method:"GET",
  //       url:"http://192.168.116.17:8080/SportInfo/personal/1",
  //       data: formData
  //      }).then(response => {
  //          console.log(response);
  //      })
}
// 下载表格
const download = () => {
    // 发送数据
    YXrequest.get({
    url: `/Excel/download/${formData.project}`,
  }).then(res => {
      console.log(res);
})
  console.log("下载" + formData.project + "号项目excel表格")
}

// 表单验证规则
// const ruleValidate = {
//   project: [ 
//     { required: true, message: '请输入学号', trigger: 'blur' }
//   ],
//   score: [
//     { required: true, message: '请输入成绩', trigger: 'blur' }
//   ],
// }

</script>

<style lang="less" scoped>
.personal {
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
      right: -50px;
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