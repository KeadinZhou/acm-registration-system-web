import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/index-page'
import ListPage from '@/components/list-page'
import PerinfoPage from '@/components/perinfo-page'
import TeamPage from '@/components/team-page'
import AdminPage from '@/components/admin-page'
import NotFoundPage from '@/components/notfound-page'
import RegPage from '@/components/reg-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '-index-page',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index-page',
      component: IndexPage
    }, {
      path: '/list',
      name: 'list-page',
      component: ListPage
    }, {
      path: '/perinfo',
      name: 'perinfo-page',
      component: PerinfoPage
    }, {
      path: '/team',
      name: 'team-page',
      component: TeamPage
    }, {
      path: '/admin',
      name: 'admin-page',
      component: AdminPage
    }, {
      path: '/register',
      name: 'reg-page',
      component: RegPage
    }, {
      path: '*',
      name: 'notfound-page',
      component: NotFoundPage
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
