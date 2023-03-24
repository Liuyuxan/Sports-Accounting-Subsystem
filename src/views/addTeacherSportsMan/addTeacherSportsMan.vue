
<template>
  <div class="personal title-center center">
    
    <h2 class="project-title ">增加职工运动员信息</h2>
    <Form ref="formData" :model="formData.value" :label-width="50" style="width: 500px">
      <div class="project top">
        <h2 class="name">选择信息</h2>
        <div class="project-inner">

          <FormItem label="项目">
          <Select v-model="formRef.sportId.value" @on-change="selectProject" style="width:450px">
            <OptionGroup label="径赛">
              <Option v-for="item in personalProjectData.sportList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="田赛">
              <Option v-for="item in personalProjectData.sportList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
          </Select>
          </FormItem>

          <FormItem label="赛区">
            <Select v-model="formRef.classify.value" @on-change="selectMatchType" style="width:450px">
              <Option v-for="item in infoType.matchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

        </div>
      </div>

      <div class="info top">
        <div class="info-title">
          <h2 class="name">填写信息</h2>
          <!-- <Button type="primary" icon="md-add" class="btn" @click="addBtnClick">添加</Button> -->
        </div>
        <template v-for="(item, index) in formRef.infos.value" :key="index">
          <div class="content">
              <Row>
                <Col>
                  <!-- <FormItem :label="'学号'+ Number(index + 1)"> -->
                  <FormItem :label="'工号:'">
                    <!-- 如果要把增加，删除按钮打开，请把输入框宽度改成266px -->
                    <Input v-model="item.id" placeholder="工号" style="width: 450px" />    
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'姓名:'">
                    <Input v-model="item.name" placeholder="姓名" style="width: 450px" />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'性别:'">
                    <Input v-model="item.sex" placeholder="男/女" style="width: 450px"/>
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'队伍:'">
                    <Input v-model="item.department" placeholder="如：职工1队" style="width: 450px" />
                  </FormItem>
                </Col>
                <Col>
                  <!-- <Button class="deleteBtn" @click="deleteBtn(index)" size="small">删除</Button> -->
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
import personalProjectData from "@/assets/data/personal-project"
import infoType from "@/assets/data/type"
import { FormItem } from 'view-ui-plus';
import YXrequest from '@/services/request';
import { useRouter } from 'vue-router';

const currentIndex = ref(1)
const router = useRouter()

// 响应式
const formData = reactive({
  sportId: "", // 运动项目
  type: "", // 人员类别
  classify: "",  // 0为预赛，1为决赛(比赛类型)
  infos: [
    {
      sportId: "",
      type: "职工", // 人员类别
      classify: "", // 0为预赛，1为决赛(比赛类型)
      id: "", // 工号
      name: "", // 姓名
      sex: "", // 性别
      department: "", // 学院
    },
  ]
})
const formRef = toRefs(formData)  // 使复杂的对象内部数据响应式

// 选择框选择完成触发
const selectProject = () => {
  formData.infos[0].sportId = formRef.sportId.value
  console.log("项目已选择")
}
const selectMatchType = () => {
  formData.infos[0].classify = formRef.classify.value
  console.log("赛区已选择")
}


// 添加数据
const addBtnClick = () => {
  currentIndex.value++

  formData.infos.push({
    sportId: formRef.sportId.value,
    type: formRef.type.value,
    classify: formRef.classify.value,
    id: "", // 工号
    name: "", // 姓名
    sex: "", // 性别
    department: "", // 学院

  })
  console.log("添加一条信息,所有信息：", formData.infos)
}


// 删除数据
const deleteBtn = (index) => {
  formData.infos.splice(index, 1)
  console.log("删除了一条信息,所剩信息：",formData.infos)
}

// 提交
const submit = () => {
  console.log(typeof(formData.infos[0]), formData.infos[0])
  console.log("已提交")

  // 发送数据
  YXrequest.post({
    url: "/Athlete/save",
    data: formData.infos[0]
  }).then(res => {
    console.log(res);

    alert("提交成功")  // 提示用户信息已提交
    router.go(0)  // 刷新页面
  })
}

</script>

<style lang="less" scoped>
.personal {
  .project {
    .project-inner {
      display: flex;
      flex-direction: column;
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
  .content {
    .ivu-row {
      display: flex;
      flex-direction: column;
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