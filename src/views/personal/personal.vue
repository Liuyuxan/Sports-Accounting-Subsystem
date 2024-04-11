<template>
  <div class="personal title-center center">
    <h2 class="project-title">项目成绩提交</h2>

    <Form
      ref="formData"
      :model="sportMans"
      :label-width="50"
      style="width: 1000px"
    >
      <div class="project top">
        <h2 class="name">选择信息</h2>
        <div class="project-inner">
          <FormItem label="类型">
            <Select
              v-model="sportType"
              @on-change="selectOption"
              style="width: 150px"
            >
              <Option
                v-for="item in infoType.sportType"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="赛制">
            <Select
              v-model="matchType"
              @on-change="selectOption"
              style="width: 150px"
            >
              <Option
                v-for="item in infoType.matchType"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="身份">
            <Select
              v-model="status"
              @on-change="selectOption"
              style="width: 150px"
            >
              <Option
                v-for="item in infoType.status"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="项目">
            <Select
              v-model="sportId"
              @on-change="selectProject"
              style="width: 300px"
            >
              <Option
                v-for="item in infoStore.sportNames"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </div>
      </div>

      <div class="info top">
        <div class="info-title">
          <h2 class="name">填写信息</h2>
          <!-- 添加按钮 -->
          <!-- <Button type="primary" icon="md-add" class="btn" @click="addBtnClick">添加</Button> -->
        </div>
        <!-- 个人项目 -->
        <template v-if="sportType == 1">
          <template v-for="(item, index) in sportMans" :key="index">
            <div class="content">
              <Row>
                <Col>
                  <FormItem :label="`编号${index+1}`">
                    <Input
                      v-model="item.number"
                      placeholder="学号/工号"
                      style="width: 200px"
                      :readonly="isReadonly"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'组织:'">
                    <Input
                      v-model="item.departmentName"
                      placeholder="学院/团队"
                      style="width: 200px"
                      :readonly="isReadonly"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'姓名:'">
                    <Input
                      v-model="item.name"
                      placeholder="姓名"
                      style="width: 200px"
                      :readonly="isReadonly"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'成绩:'">
                    <Input
                      v-model="item.score"
                      @on-blur="writeScore(item)"
                      placeholder="请输入成绩"
                      style="width: 150px"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <div class="deleteBtn">
                    <Poptip
                    confirm
                    title="确认删除?"
                    @on-ok="ok(item, index)"
                    @on-cancel="cancel">
                        <Button size="small">删除</Button>
                    </Poptip>
                  </div>
                </Col>
              </Row>
            </div>
          </template>
        </template>

        <!-- 团队项目 -->
        <template v-else>
          <template v-for="(item, index) in infoStore.sportMans" :key="index">
            <div class="content">
              <Row>
                <Col>
                  <FormItem :label="`编号${index+1}`">
                    <Input
                      v-model="item.id"
                      placeholder="团队编号"
                      style="width: 250px"
                      :readonly="isReadonly"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'团队:'">
                    <Input
                      v-model="item.name"
                      placeholder="团队名称"
                      style="width: 250px"
                      :readonly="isReadonly"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem :label="'成绩:'">
                    <Input
                      v-model="item.score"
                      @on-blur="writeScore(item)"
                      placeholder="请输入成绩"
                      style="width: 250px"
                    />
                  </FormItem>
                </Col>
                <Col>
                  <div class="deleteBtn">
                    <Poptip
                    confirm
                    title="确认删除?"
                    @on-ok="ok(item, index)"
                    @on-cancel="cancel">
                        <Button size="small">删除</Button>
                    </Poptip>
                  </div>
                </Col>
              </Row>
            </div>
          </template>
        </template>
      </div>

      <div class="btns" style="display: flex; justify-content: center">
        <div class="submit" style="margin-right: 30px">
          <Button
            type="primary"
            class="btn"
            @click="submit"
            style="width: 100px"
            >提交成绩</Button
          >
        </div>
        <div class="download" style="margin-right: 30px">
          <Button
            type="primary"
            class="btn"
            @click="download"
            style="width: 100px"
            >下载表格</Button
          >
        </div>
        <Upload
          :action="`http://47.120.10.1:1108/athletes/upload/finals?matchId=${sportId}`"
          style="margin-top: 44px"
          :show-upload-list="false"
        >
          <Button type="primary">决赛名单上传</Button>
        </Upload>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import personalProjectData from "@/assets/data/personal-project"
import infoType from "@/assets/data/type";
import { FormItem, Message } from "view-ui-plus";
import YXrequest from "@/services/request";
import { downloadExcelTable, sumbitMansScore, deleteSportMan, deleteTeam } from "@/services/modules/infos";
import { useRouter } from "vue-router";
import useInfoStore from "@/stores/modules/infos";
import { storeToRefs } from "pinia";
import { sumbitTeamScore } from "@/services";

const router = useRouter();

let isReadonly = true;

onMounted(() => {
  // 获取项目
  getSports();
  // console.log("项目列表", sportMans.value);
});

// type: 1个人/2团队，classify： 1预赛/2决赛
const getSports = () => {
  // console.log(
  //   "1个人/2团队，classify： 1预赛/2决赛",
  //   sportType.value,
  //   matchType.value
  // );
  infoStore.fetchAllSports({
    type: sportType.value,
    classify: matchType.value,
  });
};
const infoStore = useInfoStore();
const { sportMans } = storeToRefs(infoStore);

const sportId = ref(""); // 项目ID
const sportType = ref("1"); // 1个人/2团队
const status = ref("1"); // 1学生/2教职工
const matchType = ref("1"); // 1预赛/2决赛

const resetSportId = () => {
  sportId.value = "";
  infoStore.$reset();
};

// 项目名称选择完成触发
const selectProject = () => {
  // console.log(
  //   `项目id：${sportId.value}，项目类型：${sportType.value}，身份：${status.value}，赛制：${matchType.value}`
  // );
  requestInfo();
};

// 选择处理
const selectOption = () => {
  // console.log(
  //   `项目id：${sportId.value}，项目类型：${sportType.value}，身份：${status.value}，赛制：${matchType.value}`
  // );

  
  resetSportId();

  getSports();

  requestInfo();
};

// 填写成绩，默认提交成绩
const writeScore = (item) => {
  // console.log(item);
  const data = {
    id: item.id,
    score: item.score,
  };
  // console.log(data, item);
  if(sportType.value == 1) sumbitMansScore(data);
  else sumbitTeamScore(data)
};

const requestInfo = () => {
  if (sportId.value && sportType.value && status.value && matchType.value) {
    // console.log("全部选择完成");
    const data = {
      matchId: sportId.value,
      type: status.value,
    };
    if (sportType.value == 1) {
      // 请求个人运动员
      infoStore.fetchAllSportMans(data);
    } else if (sportType.value == 2) {
      // 请求团队
      infoStore.fetchAllTeam(data);
    }
  }
};

// 删除一条记录
const ok = (item, index) => {
  if (sportId.value && sportType.value && status.value && matchType.value) {
    // console.log(item, index)
    const id = item.id
    
    if(sportType.value == 1) {
      deleteSportMan([id]).then(res => {
        if(res.code === 200) {
          Message.info('删除成功');
          infoStore.deleteLine(index)
        }
        else Message.info(res.msg);
      })
    } else {
      deleteTeam(id).then(res => {
        if(res.code === 200) {
          Message.info('删除成功');
          infoStore.deleteLine(index)
        }
        else Message.info(res.msg);
      })
    }
    
  } else {
    Message.info('请选择项目');
  }
    
}
const cancel = () => {

}
// 提交成绩，因为真正的提交成绩在输入时焦点消失就已经进行了提交，所以这里做一次刷新页面即可
const submit = () => {
  alert("提交成功")  // 提示用户信息已提交
  router.go(0)  // 刷新页面
};

// 下载表格
const download = () => {
  // console.log(
  //   `下载---项目id：${sportId.value}，项目类型：${sportType.value}，身份：${status.value}，赛制：${matchType.value}`
  // );
  // 发送数据

  // const name = sportMans
  // console.log("name", sportMans.value);
  const statusName = status.value == 1 ? '学生-' : '教职工-'
  downloadExcelTable({
    type: sportType.value,
    name: sportMans.value[0].matchName
      ? statusName + sportMans.value[0].matchName
      : statusName + sportMans.value[0].name.replace(/\*/g, "X"),
    classify: matchType.value,
    id: sportId.value,
  }, status.value).then((res) => {
    if (res.code === 200) window.open(res.data);
  });
};
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
      right: -400px;
      height: 30px;
    }
  }
  .deleteBtn {
    position: absolute;
    top: 5px;
    left: 10px;
  }

  .submit {
    display: flex;
    justify-content: center;
  }
}
</style>
