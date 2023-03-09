import Register from "@/pages/member/auth/Register.vue";
import MemberLogin from "@/pages/member/auth/Login.vue";

export default {
    routes: [
        // {
        //     redirect: { name: 'home' },
        //     component: GuestLayout,
        //     children: [
        //
        //     ],
        // }
        {
            path: '/member/register',
            name: 'member.register',
            component: Register,
            meta: { title: 'Register' },
        },
        {
            path: '/member/login',
            name: 'member.login',
            component: MemberLogin,
            meta: { title: 'Login' },
        },
    ],
}
