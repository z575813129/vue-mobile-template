/**
 * Created by zack on 2016/7/25.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/college/:collegeID',
      component: require('../App.vue')
    },
    {
      path: '/college/:collegeID/experts',
      component: require('../views/ExpertList.vue')
    },
    {
      path: '/college/:collegeID/experts/:expertID',
      component: require('../views/askExpert.vue')
    },
    {
      path: '/college/:collegeID/experts/:expertID/toAsk',
      component: require('../views/askExpert.vue')
    },
    {
      path: '/college/:collegeID/class1/:instanceID',
      component: require('../views/Class1.vue')
    },
    {
      path: '/college/:collegeID/class2/:instanceID',
      component: require('../views/Class2.vue')
    },
    {
      path: '/college/:collegeID/class3/:instanceID',
      component: require('../views/Class3.vue')
    },
    {
      path: '/college/:collegeID/class4/:instanceID',
      component: require('../views/Class4.vue')
    },
    {
      path: '/college/:collegeID/class5/:instanceID',
      component: require('../views/Class5.vue')
    },
    {
      path: '/college/:collegeID/class6/:instanceID',
      component: require('../views/Class6.vue')
    },
    {
      path: '/college/:collegeID/class7/:instanceID',
      component: require('../views/Class7.vue')
    },
    {
      path: '/college/:collegeID/class8/:instanceID',
      component: require('../views/Class8.vue')
    },
    {
      path: '/college/:collegeID/class9/:instanceID',
      component: require('../views/Class9.vue')
    },
    {
      path: '/college/:collegeID/class10/:instanceID',
      component: require('../views/Class10.vue')
    },
    {
      path: '/college/:collegeID/class11/:instanceID',
      component: require('../views/Class11.vue')
    },
    {
      path: '/college/:collegeID/class12/:instanceID',
      component: require('../views/Class12.vue')
    },
    {
      path: '/college/:collegeID/class13/:instanceID',
      component: require('../views/Class13.vue')
    },
    {
      path: '/college/:collegeID/class14/:instanceID',
      component: require('../views/Class14.vue')
    },
    {
      path: '/college/:collegeID/class15/:instanceID',
      component: require('../views/Class15.vue')
    },
    {
      path: '/college/:collegeID/class16/:instanceID',
      component: require('../views/Class16.vue')
    },
    {
      path: '/college/:collegeID/class17/:instanceID',
      component: require('../views/Class17.vue')
    },
    {
      path: '/college/:collegeID/class18/:instanceID',
      component: require('../views/Class18.vue')
    },
    {
      path: '/college/:collegeID/resources/:resID/details/:detID',
      component: require('../views/ResourceDetail.vue')
    },
    {
      path: '/user/:userID/question',
      component: require('../views/questionList.vue')
    },
    {
      path: '*',
      component: require('../views/NotFound.vue')
    }
  ]
})
export default router
