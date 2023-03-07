import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/store/auth';
import { pbStore } from '@/store/pb';

// import AuthenticatedLayout from '../layouts/Authenticated.vue';
import GuestLayout from '@/layouts/Guest.vue';

import Home from '@/pages/Home.vue';
import Login from '@/pages/member/auth/Login.vue';
import Register from '@/pages/member/auth/Register.vue';
import MemberHome from '@/pages/member/Home.vue';
import TasksIndex from '@/pages/tasks/Index.vue';
import TasksCreate from '@/pages/tasks/Create.vue';
import TasksDetail from '@/pages/tasks/Detail.vue';
import TasksEdit from '@/pages/tasks/Edit.vue';
// import Login from '../components/Login.vue';

// function auth(to, from, next) {
//     if (JSON.parse(localStorage.getItem('loggedIn'))) {
//         next();
//     }
//
//     next('/login');
// }


const routes = [
    {
        redirect: { name: 'home' },
        component: GuestLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: { title: 'Home' },
            },
            {
                path: '/tasks',
                name: 'tasks.index',
                component: TasksIndex,
                meta: { title: 'Tasks', customPbFinish: true },
            },
            {
                path: '/tasks/create',
                name: 'tasks.create',
                component: TasksCreate,
                meta: { title: 'Tasks Create' },
            },
            {
                path: '/tasks/:id',
                name: 'tasks.detail',
                component: TasksDetail,
                meta: { title: 'Tasks Detail', customPbFinish: true },
                props: true,
            },
            {
                path: '/tasks/:id/edit',
                name: 'tasks.edit',
                component: TasksEdit,
                meta: { title: 'Tasks Edit', customPbFinish: true },
                props: true,
            },
            {
                path: '/member/register',
                name: 'member.register',
                component: Register,
                meta: { title: 'Register' },
            },
            {
                path: '/member/login',
                name: 'member.login',
                component: Login,
                meta: { title:'Login' },
            },
            {
                path: '/member',
                name: 'member.home',
                component: MemberHome,
                meta: { title: 'Member Home' },
            },
        ]
    },
    // {
    //     component: AuthenticatedLayout,
    //     beforeEnter: auth,
    //     children: [
    //         {
    //             path: '/posts',
    //             name: 'posts.index',
    //             component: PostsIndex,
    //             meta: { title: 'Posts' },
    //         },
    //         {
    //             path: '/posts/create',
    //             name: 'posts.create',
    //             component: PostsCreate,
    //             meta: { title: 'Add new post' },
    //         },
    //         {
    //             path: '/posts/edit/:id',
    //             name: 'posts.edit',
    //             component: PostsEdit,
    //             meta: { title: 'Edit post' },
    //         },
    //     ],
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve(async (to, from, next) => {
    const pb = pbStore();

    if (to.name && !pb.isLoading) {
        await pb.start();
    }
    next();
})

router.afterEach( async (to, from) => {
    const customPbFinish = to.meta.customPbFinish;

    // 初回読み込み時にログインユーザー情報をセットする
    if (!from.name) {
        await authStore().checkAuthenticated();
    }

    if (customPbFinish === undefined || customPbFinish === false) {
        // await new Promise(resolve => setTimeout(resolve, 400));
        await pbStore().finish();
    }
})

export default router
