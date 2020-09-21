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
              path: '/modify-information',
              name: 'modify-information',
              component: Layout,
              children: [{
                path: '/modify-information',
                name: 'modify-information',
                component: () => import('@/views/modify-information/modify-information.vue'),
                meta: {
                  title: '修改信息'
                }
              }]
            },
            {
            path: '/',
            component: Layout,
            redirect: '/basic-setup',
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
                    path: '/home',
                    name: 'home',
                    component: () =>
                        import ('@/views/layout/home'),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/test-items',
                    name: 'test-items',
                    component: () =>
                        import ('@/views/test-management/test-items/test-items.vue'),
                    meta: {
                        title: '检测项目'
                    }
                },
                {
                    path: '/test-items-add',
                    name: 'test-items-add',
                    component: () =>
                        import ('@/views/test-management/test-items-add/test-items-add.vue'),
                    meta: {
                        title: '检测项目新增'
                    }
                },
                {
                    path: '/modify-password',
                    name: 'modify-password',
                    component: () =>
                        import ('@/views/modify-password/modify-password.vue')
                },
                {
                    path: '/defect-list',
                    name: 'defect-list',
                    component: () =>
                        import ('@/views/test-management/defect-list/defect-list.vue'),
                    meta: {
                        title: '缺陷列表'
                    }
                },
                {
                    path: '/defects-problem',
                    name: 'defects-problem',
                    component: () =>
                        import ('@/views/test-management/defects-problem/defects-problem.vue'),
                    meta: {
                        title: '缺陷问题'
                    }
                },
                {
                    path: '/question-list',
                    name: 'question-list',
                    component: () =>
                        import ('@/views/test-management/question-list/question-list.vue'),
                    meta: {
                        title: '问题列表'
                    }
                },
                {
                    path: '/project-schedule',
                    name: 'project-schedule',
                    component: () =>
                        import ('@/views/test-management/project-schedule/project-schedule.vue'),
                    meta: {
                        title: '项目进度'
                    }
                },
                {
                    path: '/project-statistics',
                    name: 'project-statistics',
                    component: () =>
                        import ('@/views/test-management/project-statistics/project-statistics.vue'),
                    meta: {
                        title: '项目统计'
                    }
                },
                {
                    path: '/new-problems',
                    name: 'new-problems',
                    component: () =>
                        import ('@/views/test-management/new-problems/new-problems.vue'),
                    meta: {
                        title: '新增问题'
                    }
                },
                {
                    path: '/modify-problem',
                    name: 'modify-problem',
                    component: () =>
                        import ('@/views/test-management/modify-problem/modify-problem.vue'),
                    meta: {
                        title: '修改问题'
                    }
                },
                {
                  path: '/company-list',
                  name: 'company-list',
                  component: () => import('@/views/platform-maintenance/company-list/company-list.vue'),
                  meta: {
                    title: '公司列表'
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
                  path: '/project-data',
                  name: 'project-data',
                  component: () => import('@/views/platform-maintenance/project-data/project-data.vue'),
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
                  path: '/project-datanum',
                  name: 'project-datanum',
                  component: () => import('@/views/platform-maintenance/project-data/project-datanum.vue'),
                  meta: {
                    title: '月份总览-修改'
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
                  path: '/basic-settings-modification',
                  name: 'basic-settings-modification',
                  component: () => import('@/views/platform-maintenance/basic-settings-modification/basic-settings-modification.vue'),
                  meta: {
                    title: '基本设置-修改'
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
                  path: '/add-manage-info',
                  name: 'add-manage-info',
                  component: () => import('@/views/platform-maintenance/add-manage-info/add-manage-info.vue'),
                  meta: {
                    title: '新增管理员信息'
                  }
                },
                {
                  path: '/updata-company-info',
                  name: 'updata-company-info',
                  component: () => import('@/views/platform-maintenance/updata-company-info/updata-company-info.vue'),
                  meta: {
                    title: '修改公司信息'
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
                {
                  path: '/organ-structure-list',
                  name: 'organ-structure-list',
                  component: () => import('@/views/platform-maintenance/organ-structure-list/organ-structure-list.vue'),
                  meta: {
                    title: '组织结构列表'
                  }
                },
                {
                  path: '/organ-structure-updata',
                  name: 'organ-structure-updata',
                  component: () => import('@/views/platform-maintenance/organ-structure-updata/organ-structure-updata.vue'),
                  meta: {
                    title: '组织结构修改'
                  }
                },
                {
                  path: '/all-tests-projects',
                  name: 'all-tests-projects',
                  component: () => import('@/views/manage-projects/all-tests-projects/all-tests-projects.vue'),
                  meta: {
                    title: '管理项目-全部检测项目'
                  }
                },
                {
                  path: '/all-project',
                  name: 'all-tests-projects',
                  component: () => import('@/views/management-item/all-project/all-project.vue'),
                  meta: {
                    title: '管理项目-全部检测项目'
                  }
                },
                {
                  path: '/flaw-list',
                  name: 'flaw-list',
                  component: () => import('@/views/management-item/flaw-list/flaw-list.vue'),
                  meta: {
                    title: '管理项目-缺陷列表'
                  }
                },
                {
                  path: '/flaw-question',
                  name: 'flaw-question',
                  component: () => import('@/views/management-item/flaw-question/flaw-question.vue'),
                  meta: {
                    title: '管理项目-缺陷问题'
                  }
                },
                {
                  path: '/add-project',
                  name: 'add-project',
                  component: () => import('@/views/management-item/add-project/add-project.vue'),
                  meta: {
                    title: '管理项目-添加项目'
                  }
                },
                {
                  path: '/question',
                  name: 'question',
                  component: () => import('@/views/management-item/question-list/question-list.vue'),
                  meta: {
                    title: '管理项目-问题列表'
                  }
                },
                {
                  path: '/project-show',
                  name: 'project-show',
                  component: () => import('@/views/management-item/project-show/project-show.vue'),
                  meta: {
                    title: '管理项目-项目进度展示'
                  }
                },
                {
                  path: '/change-question',
                  name: 'change-question',
                  component: () => import('@/views/management-item/change-question/change-question.vue'),
                  meta: {
                    title: '管理项目-修改问题'
                  }
                },
                {
                  path: '/new-question',
                  name: 'all-tests-projects',
                  component: () => import('@/views/management-item/new-quest/new-quest.vue'),
                  meta: {
                    title: '管理项目-新增问题'
                  }
                },
                {
                  path: '/change-projects',
                  name: 'change-projects',
                  component: () => import('@/views/manage-projects/all-tests-projects/all-tests-projects.vue'),
                  meta: {
                    title: '管理项目-项目修改'
                  }
                }]
  }]
})