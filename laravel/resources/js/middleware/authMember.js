import { memberStore } from '@/stores/member';

export default function authAdmin({next}) {
    const ms = memberStore();

    if (!ms.isAuthenticated) {
        return next({
            name: 'notfound',
        });
    }

    return next();
}
