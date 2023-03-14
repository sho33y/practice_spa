import { adminStore } from '@/stores/admin';

export default function authAdmin({next}) {
    const as = adminStore();

    if (!as.isAuthenticated) {
        return next({
            name: 'notfound',
        });
    }

    return next();
}
