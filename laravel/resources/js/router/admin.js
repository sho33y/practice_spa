import AdminLogin from "@/pages/admin/auth/Login.vue";

export default {
    routes: [
        // {
        //     component: AdminLayout,
        //     children: [
        //
        //     ],
        // }
        {
            path: '/admin/login',
            name: 'admin.login',
            component: AdminLogin,
            meta: { title: 'Admin Login' },
        },
    ],
}
