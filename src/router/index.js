import Vue from 'vue'
import Router from 'vue-router';
import Login from '../pages/login/index.vue';
import Contact from '../pages/chat/index.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '',
        //     redirect: '/login'
        // },
        // {
        //     path: '/',
        //     redirect: '/login'
        // },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'login',
            component: Login
        },
        {
            path: '/contact/:id',
            name: 'contact',
            component: Contact
        },
        {
            path: '/contact',
            name: 'contact',
           component: Contact
        },
        {
            path: '/group/:id',
            name: 'group',
            component: Contact
        },
        {
            path: '/group',
            name: 'group',
            component: Contact
        },
        {
            path: '/chatroom/:id',
            name: 'chatroom',
            component: Contact
        },
        {
            path: '/chatroom',
            name: 'chatroom',
            component: Contact
        },
      {
        path: '/sys-check',
        name: 'check',
        meta: { title: '信息校验' },
        component: () => import('../components/CheckToken.vue')
      },
      {
        path: '/forbidden',
        component: () => import('../components/Forbidden.vue'),
        hidden: true,
        meta: {
          title: '登录后台管理系统'
        }
      },
    ]
})
