<template>
  <div class="tab-bar">
    <Menu theme="light" :active-name="activeName" >
      <MenuGroup title="提交成绩">
        <MenuItem name="/personal" to="/personal">
          <Icon type="ios-man" />
          个人项目成绩提交
        </MenuItem>
        <MenuItem name="/team" to="/team">
          <Icon type="ios-body" />
          团队项目成绩提交
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="查询">
        <MenuItem name="/studentRank" to="/studentRank">
          <Icon type="ios-search" />
          学生项目排名查询
        </MenuItem>
        <MenuItem name="/teacherRank" to="/teacherRank">
          <Icon type="ios-search" />
          教职工项目排名查询
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="增加数据">
        <MenuItem name="/addStudentSportsMan" to="/addStudentSportsMan">
          <Icon type="md-person-add" />
          增加学生运动员
        </MenuItem>
        <MenuItem name="/addTeacherSportsMan" to="/addTeacherSportsMan">
          <Icon type="md-person-add" />
          增加职工运动员
        </MenuItem>
        <MenuItem name="/addStudentTeam" to="/addStudentTeam">
          <Icon type="md-add" />
          增加学生团队
        </MenuItem>
        <MenuItem name="/addTeacherTeam" to="/addTeacherTeam">
          <Icon type="md-add" />
          增加职工团队
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script setup>


import { computed } from 'vue'
import { useRoute } from 'vue-router';
let route = useRoute()

// 菜单切换高亮显示
let activeName = computed(() => route.path)

</script>

<style lang="less" scoped>
// 更改选中状态的背景颜色与字体颜色
// .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  
// }

.tab-bar {
  font-weight: 500;

}


</style>