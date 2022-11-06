import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/main.vue'
export const constantRouterMap = [
    { path: '/', redirect: '/home' },
    { path: '/login', component: () => import('@/views/login/index'), name: 'login', meta: { title: '登录' } },
    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/home/index'),
            meta: { title: '首页', icon: 'home' }
        }]
    },

]

export const asyncRouterMap = [
    {
        path: '/base',
        component: Layout,
        redirect: '/base/customer',
        name: 'base',
        meta: { title: '基础管理', icon: 'base' },
        children: [{
            path: "customer",
            name: "base_customer",
            component: () => import('@/views/base/customer/index'),
            meta: { title: '客户管理', icon: 'base_customer' }
        },
        {
            path: "supply",
            name: "base_supply",
            component: () => import('@/views/base/supply/index'),
            meta: { title: '供应商管理', icon: 'base_supply' }
        },
        {
            path: "goods",
            name: "base_goods",
            component: () => import('@/views/base/goods/index'),
            meta: { title: '商品管理', icon: 'base_goods' }
        }
        ]

    },
    {
        path: '/import',
        component: Layout,
        redirect: '/import/goods',
        name: 'import',
        meta: { title: '进货管理', icon: 'import' },
        children: [{
            path: "goods",
            name: "import_goods",
            component: () => import('@/views/import/goods/index'),
            meta: { title: '商品进货', icon: 'import_goods' }
        },
        {
            path: "return",
            name: "import_return",
            component: () => import('@/views/import/return/index'),
            meta: { title: '商品退货查询', icon: 'import_return' }
        },
        ]
    },
    {
        path: '/sale',
        component: Layout,
        redirect: '/sale/goods',
        name: 'sale',
        meta: { title: '销售管理', icon: 'sale' },
        children: [{
            path: "goods",
            name: "sale_goods",
            component: () => import('@/views/sale/goods/index'),
            meta: { title: '商品销售', icon: 'sale_goods' }
        },
        {
            path: "return",
            name: "sale_return",
            component: () => import('@/views/sale/return/index'),
            meta: { title: '销售退货查询', icon: 'sale_return' }
        }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/dept',
        name: 'system',
        meta: { title: '系统管理', icon: 'system' },
        children: [{
            path: "dept",
            name: "system_dept",
            component: () => import('@/views/system/dept/index'),
            meta: { title: '部门管理', icon: 'system_dept' }
        },
        {
            path: "menu",
            name: "system_menu",
            component: () => import('@/views/system/menu/index'),
            meta: { title: '菜单管理', icon: 'system_menu' }
        },
        {
            path: "permission",
            name: "system_permission",
            component: () => import('@/views/system/permission/index'),
            meta: { title: '权限管理', icon: 'system_permission' }
        },
        {
            path: "role",
            name: "system_role",
            component: () => import('@/views/system/role/index'),
            meta: { title: '角色管理', icon: 'system_role' }
        },
        {
            path: "user",
            name: "system_user",
            component: () => import('@/views/system/user/index'),
            meta: { title: '用户管理', icon: 'system_user' }
        }
        ]
    },
    {
        path: '/other',
        component: Layout,
        redirect: '/other/logged',
        name: 'other',
        meta: { title: '其它管理', icon: 'other' },
        children: [{
            path: "logged",
            name: "other_logged",
            component: () => import('@/views/other/logged/index'),
            meta: { title: '登陆日志', icon: 'other_logged' }
        },
        {
            path: "board",
            name: "other_board",
            component: () => import('@/views/other/board/index'),
            meta: { title: '系统公告', icon: 'other_board' }
        },
        {
            path: "iconic",
            name: "other_iconic",
            component: () => import('@/views/other/iconic/index'),
            meta: { title: '图标管理', icon: 'other_iconic' }
        }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    routes: constantRouterMap
})