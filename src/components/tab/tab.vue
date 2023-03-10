<template>
  <div class="tab-bar">
    <Menu theme="light" :active-name="activeName">
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
        <MenuItem name="/rank" to="/rank">
          <Icon type="ios-search" />
          项目排名查询
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

// 废弃的旧样式高亮显示切换
// const tabbarStore = useTabbarStore()
// const { tabbarIndex } = storeToRefs(tabbarStore)
// // const tabActive = computed(() => tabbarIndex.value)  // 会报警告,原因见语雀项目记录

// // 使用这行代码
// let tabActive = computed({
//   get() {
//     // 此处返回的计算属性依赖的值
//     return tabbarIndex.value
//   },
//   set(newValue) {
//     // newValue是更新后的值，set里面写具体的修改逻辑，直接修改源响应数据的值
//     tabbarIndex.value = newValue
//   }
// })


</script>

<style lang="less" scoped>
// 更改选中状态的背景颜色与字体颜色
// .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  
// }

.tab-bar {
  font-weight: 500;

}


</style>