import { adminStore } from '@/store/admin';

export default function authAdmin({next}) {
    const as = adminStore();

    if (!as.isAuthenticated) {
        return next({
            name: 'notfound',
        });
    }

    return next();
}
