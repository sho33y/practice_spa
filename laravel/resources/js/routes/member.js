import authMember from "@/middleware/authMember";
import guestMember from "@/middleware/guestMember";
import MemberLayout from "@/layouts/Member.vue";
import GuestLayout from "@/layouts/Guest.vue";
import Register from "@/pages/member/auth/Register.vue";
import Login from "@/pages/member/auth/Login.vue";
import Home from "@/pages/member/Home.vue";

export default {
    routes: [
        {
            component: GuestLayout,
            children: [
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
                    meta: { title: 'Login' },
                },
            ],
            meta: { middleware: [guestMember] },
        },
        {
            path: '/member',
            component: MemberLayout,
            children: [
                {
                    path: '',
                    name: 'member.home',
                    component: Home,
                    meta: { title: 'Mypage Home' },
                },
            ],
            meta: { middleware: [authMember] },
        },
    ],
}
