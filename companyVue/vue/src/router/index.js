import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404'
import Layout from '@/views/layout/layout'

Vue.use(Router)

export default new Router({
    routes: [
            {
              path: '/404',
              name: '404',
              component: NotFound,
              hidden: true
            },
            {
              path: '/login',
              name: 'login',
              component: () => import('@/views/login/login.vue'),
              meta: {
                title: '登录'
              }
            },
            {
              path: '/forgot-password',
              name: 'forgot-password',
              component: () => import('@/views/forgot-password/forgot-password.vue'),
              meta: {
                title: '忘记密码'
              }
            },
          
            {
            path: '/',
            component: Layout,
            redirect: '/login',
            children: [{
                    path: '/403',
                    name: '403',
                    component: () =>
                        import ('@/views/403'),
                    meta: {
                        title: '无权限'
                    }
                },
              
                {
                  path: '/project-datalist',
                  name: 'project-datalist',
                  component: () => import('@/views/platform-maintenance/project-data/project-datalist.vue'),
                  meta: {
                    title: '项目数据'
                  }
                },
               
                {
                  path: '/project-list',
                  name: 'project-list',
                  component: () => import('@/views/platform-maintenance/project-data/project-list.vue'),
                  meta: {
                    title: '月份总览'
                  }
                },
                {
                  path: '/basic-setup',
                  name: 'basic-setup',
                  component: () => import('@/views/platform-maintenance/basic-setup/basic-setup.vue'),
                  meta: {
                    title: '基本设置'
                  }
                },
               
                {
                  path: '/manage-info-list',
                  name: 'manage-info-list',
                  component: () => import('@/views/platform-maintenance/manage-info-list/manage-info-list.vue'),
                  meta: {
                    title: '管理员列表'
                  }
                },
                {
                  path: '/manage-info-listdetail',
                  name: 'manage-info-listdetail',
                  component: () => import('@/views/platform-maintenance/manage-info-list/manage-info-listdetail.vue'),
                  meta: {
                    title: '管理员列表'
                  }
                },
               
                {
                  path: '/add-user',
                  name: 'add-user',
                  component: () => import('@/views/platform-maintenance/add-user/add-user.vue'),
                  meta: {
                    title: '新增用户信息'
                  }
                },
                {
                  path: '/make-user',
                  name: 'make-user',
                  component: () => import('@/views/platform-maintenance/add-user/make-user.vue'),
                  meta: {
                    title: '新增用户信息'
                  }
                },
                
                {
                  path: '/user-list',
                  name: 'user-list',
                  component: () => import('@/views/platform-maintenance/user-list/user-list.vue'),
                  meta: {
                    title: '用户列表'
                  }
                },
                {
                  path: '/user-group-list',
                  name: 'user-group-list',
                  component: () => import('@/views/platform-maintenance/user-group-list/user-group-list.vue'),
                  meta: {
                    title: '用户组列表'
                  }
                },
               ]
  }]
})