import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import adminlog from '@/components/adminlog'
import admin from '@/components/admin'
import addstu from '@/components/admin/addstu'
import addtch from '@/components/admin/addtch'
import csxs from '@/components/admin/csxs'
import csjs from '@/components/admin/csjs'
import stu from '@/components/stu'
import stumsg from '@/components/stu/stumsg'
import Editmsg from '@/components/stu/editmsg'
import Homework from '@/components/stu/Homework'
import wrongtopicForm from '@/components/stu/wrongtopicForm'
import tch from '@/components/tch'
import tchmsg from '@/components/tch/tchmsg'
import editmsg from '@/components/tch/editmsg'
import designHwork from '@/components/tch/designHwork'
import publishHomework from '@/components/tch/publishHomework'
import checkHomework from '@/components/tch/checkHomework'
import stuForm from '@/components/tch/stuForm'
import stustatus from '@/components/tch/stustatus'
import Updatepsw from '@/components/UPdatepsw'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/adminlog',
      name: 'adminlog',
      component: adminlog
    },
    {
      path: '/admin',
      name: 'damin',
      component: admin,
      children: [
        { path: 'addstu', component: addstu },
        { path: 'addtch', component: addtch },
        { path: 'csxs', component: csxs },
        { path: 'csjs', component: csjs }
      ]
    },
    {
      path: '/stu',
      name: 'stu',
      component: stu,
      children: [
        { path: 'stumsg', component: stumsg },
        { path: 'editmsg', component: Editmsg },
        { path: 'Homework', component: Homework },
        { path: 'wrongtopicForm', component: wrongtopicForm }
      ]
    },
    {
      path: '/tch',
      name: 'tch',
      component: tch,
      children: [
        { path: 'tchmsg', component: tchmsg },
        { path: 'editmsg', component: editmsg },
        { path: 'stuForm', component: stuForm },
        { path: 'stustatus', component: stustatus },
        { path: 'designHwork', component: designHwork },
        { path: 'publishHomework', component: publishHomework },
        { path: 'checkHomework', component: checkHomework }
      ]
    },
    { path: '/Updatepsw', component: Updatepsw }
  ]
})
