import { createRouter, createWebHistory } from 'vue-router';
import { pbStore } from '@/store/pb';

// import AuthenticatedLayout from '../layouts/Authenticated.vue';
import GuestLayout from '@/layouts/Guest.vue';

import Home from '@/pages/Home.vue';
import TasksIndex from '@/pages/Tasks/Index.vue';
import TasksCreate from '@/pages/Tasks/Create.vue';
import TasksDetail from '@/pages/Tasks/Detail.vue';
import TasksEdit from '@/pages/Tasks/Edit.vue';
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
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login,
            //     meta: {title:'Login'},
            // },
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

router.beforeResolve((to, from, next) => {
    if (to.name && !pbStore().isLoading) {
        pbStore().start();
    }
    next();
})

router.afterEach( (to, from) => {
    const customPbFinish = to.meta.customPbFinish;
    if (customPbFinish === undefined || customPbFinish === false) {
        // await new Promise(resolve => setTimeout(resolve, 400));
        pbStore().finish();
    }
})

export default router
