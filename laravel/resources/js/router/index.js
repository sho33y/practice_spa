import { createRouter, createWebHistory } from "vue-router";

// import AuthenticatedLayout from "../layouts/Authenticated.vue";
import GuestLayout from "@/layouts/Guest.vue";

import Home from '@/pages/Home.vue';
import PostsIndex from "@/pages/Posts/Index.vue";
// import PostsCreate from "../components/Posts/Create.vue";
// import PostsEdit from "../components/Posts/Edit.vue";
//
// import Login from "../components/Login.vue";

// function auth(to, from, next) {
//     if (JSON.parse(localStorage.getItem("loggedIn"))) {
//         next();
//     }
//
//     next("/login");
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
                path: "/posts",
                name: "posts.index",
                component: PostsIndex,
                meta: { title: "Posts" },
            },
            // {
            //     path: '/about',
            //     name: 'about',
            //     component: About,
            //     meta: {title:'About us'},
            // },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login,
            //     meta: {title:'Login'},
            // },
            // {
            //     path: '/register',
            //     name: 'register',
            //     component: Register,
            //     meta: {title:'Register'},
            // },
        ]
    },
    // {
    //     component: AuthenticatedLayout,
    //     beforeEnter: auth,
    //     children: [
    //         {
    //             path: "/posts",
    //             name: "posts.index",
    //             component: PostsIndex,
    //             meta: { title: "Posts" },
    //         },
    //         {
    //             path: "/posts/create",
    //             name: "posts.create",
    //             component: PostsCreate,
    //             meta: { title: "Add new post" },
    //         },
    //         {
    //             path: "/posts/edit/:id",
    //             name: "posts.edit",
    //             component: PostsEdit,
    //             meta: { title: "Edit post" },
    //         },
    //     ],
    // },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
