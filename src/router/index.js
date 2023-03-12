import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系
  routes: [
    {
      path: "/",
      redirect: "/personal",
    },
    {
      path: '/personal',
      component: () => import("@/views/personal/personal.vue")
    },
    {
      path: '/team',
      component: () => import("@/views/team/team.vue")
    },
    {
      path: '/studentRank',
      component: () => import("@/views/studentRank/studentRank.vue"),
    },
    {
      path: '/teacherRank',
      component: () => import("@/views/teacherRank/teacherRank.vue"),
    },
  ]
})

export default router
