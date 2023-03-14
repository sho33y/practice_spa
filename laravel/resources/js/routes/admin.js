import authAdmin from "@/middleware/authAdmin";
import guestAdmin from "@/middleware/guestAdmin";
import AdminLayout from "@/layouts/Admin.vue";
import GuestLayout from "@/layouts/Guest.vue";
import Home from "@/pages/admin/Home.vue";
import Login from "@/pages/admin/auth/Login.vue";

export default {
    routes: [
        {
            component: GuestLayout,
            children: [
                {
                    path: '/admin/login',
                    name: 'admin.login',
                    component: Login,
                    meta: { title: 'Admin Home' },
                },
            ],
            meta: { middleware: [guestAdmin] },
        },
        {
            path: '/admin',
            component: AdminLayout,
            children: [
                {
                    path: '',
                    name: 'admin.home',
                    component: Home,
                    meta: { title: 'Admin Home' },
                },
            ],
            meta: { middleware: [authAdmin] },
        },
    ],
}
