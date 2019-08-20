import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/page/index-page'
import ListPage from '@/components/page/list-page'
import PerinfoPage from '@/components/page/perinfo-page'
import TeamPage from '@/components/page/team-page'
import AdminPage from '@/components/page/admin-page'
import Error401Page from '@/components/page/error401-page'
import Error404Page from '@/components/page/error404-page'
import RegPage from '@/components/page/reg-page'
import LoginPage from '@/components/page/login-page'
import EmailPage from '@/components/page/email-page'

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
      component: IndexPage,
      meta: {
        title: '首页'
      }
    }, {
      path: '/list',
      name: 'list-page',
      component: ListPage,
      meta: {
        title: '报名列表'
      }
    }, {
      path: '/perinfo',
      name: 'perinfo-page',
      component: PerinfoPage,
      meta: {
        title: '个人信息'
      }
    }, {
      path: '/team',
      name: 'team-page',
      component: TeamPage,
      meta: {
        title: '队伍管理'
      }
    }, {
      path: '/admin',
      name: 'admin-page',
      component: AdminPage,
      meta: {
        title: '管理后台'
      }
    }, {
      path: '/register',
      name: 'reg-page',
      component: RegPage,
      meta: {
        title: '注册'
      }
    }, {
      path: '/activate',
      name: 'email-page',
      component: EmailPage,
      meta: {
        title: '激活账号'
      }
    }, {
      path: '/login',
      name: 'login-page',
      component: LoginPage,
      meta: {
        title: '登录'
      }
    }, {
      path: '/error401',
      name: 'error401-page',
      component: Error401Page,
      meta: {
        title: '错误'
      }
    }, {
      path: '*',
      name: 'notfound-page',
      component: Error404Page,
      meta: {
        title: '错误'
      }
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
