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
    {
      path: '/addStudentSportsMan',
      component: () => import("@/views/addStudentSportsMan/addStudentSportsMan.vue"),
    },
    {
      path: '/addTeacherSportsMan',
      component: () => import("@/views/addTeacherSportsMan/addTeacherSportsMan.vue"),
    },
    {
      path: '/addStudentTeam',
      component: () => import("@/views/addStudentTeam/addStudentTeam.vue"),
    },
    {
      path: '/addTeacherTeam',
      component: () => import("@/views/addTeacherTeam/addTeacherTeam.vue"),
    },
  ]
})

export default router
