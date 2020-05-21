import Vue from 'vue'
import Router from 'vue-router'
const IndexPage = () => import('@/components/page/index-page')
const ListPage = () => import('@/components/page/list-page')
const PerinfoPage = () => import('@/components/page/perinfo-page')
const TeamPage = () => import('@/components/page/team-page')
const AdminPage = () => import('@/components/page/admin-page')
const Error401Page = () => import('@/components/page/error401-page')
const Error404Page = () => import('@/components/page/error404-page')
const RegPage = () => import('@/components/page/reg-page')
const LoginPage = () => import('@/components/page/login-page')
const EmailPage = () => import('@/components/page/email-page')
const AboutPage = () => import('@/components/page/about-page')

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
      path: '/about',
      name: 'about-page',
      component: AboutPage,
      meta: {
        title: '关于'
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
