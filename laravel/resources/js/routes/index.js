import { createRouter, createWebHistory } from 'vue-router';
import { adminStore } from '@/stores/admin';
import { memberStore } from '@/stores/member';
import { notFoundStore } from '@/stores/notfound';
import { pbStore } from '@/stores/progress-bar';
import middlewarePipeline from "@/middleware/pipeline";
import adminRoutes from '@/routes/admin';
import memberRoutes from '@/routes/member';
import GuestLayout from '@/layouts/Guest.vue';
import NotFoundLayout from '@/layouts/NotFound.vue';
import Home from '@/pages/Home.vue';
import TasksIndex from '@/pages/tasks/Index.vue';
import TasksCreate from '@/pages/tasks/Create.vue';
import TasksDetail from '@/pages/tasks/Detail.vue';
import TasksEdit from '@/pages/tasks/Edit.vue';

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
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundLayout,
        name: 'notfound',
    },
    ...adminRoutes.routes,
    ...memberRoutes.routes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve((to, from, next) => {
    const nf = notFoundStore();
    const pb = pbStore();

    // ローディングバー表示
    if (to.name && !pb.isLoading) {
        pb.start();
    }

    // ミドルウェア処理
    if (!to.meta.middleware) {
        return next();
    }

    const { middleware } = to.meta;
    const context = {
        to,
        from,
        next,
    };

    return middleware[0]({
        ...context,
        next: middlewarePipeline(middleware, context, 1),
    });
})

router.afterEach( async (to, from) => {
    const customPbFinish = to.meta.customPbFinish;
    const baseTitle = 'SPA';
    const nf = notFoundStore();

    // 404をfalseに設定
    nf.disable();

    // ページタイトル設定
    document.title = to.meta.title
        ? to.meta.title + ' | ' + baseTitle
        : baseTitle;

    // 初回読み込み時にログインユーザー情報をセットする
    if (!from.name) {
        await adminStore().checkAuthenticated();
        await memberStore().checkAuthenticated();
    }

    // ローディングバー非表示
    if (customPbFinish === undefined || customPbFinish === false) {
        // await new Promise(resolve => setTimeout(resolve, 400));
        await pbStore().finish();
    }
})

export default router
