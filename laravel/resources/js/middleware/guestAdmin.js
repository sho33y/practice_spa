import { adminStore } from '@/store/admin';

export default function guestAdmin({ next }) {
    const as = adminStore();

    if (as.isAuthenticated) {
        return next({
            name: 'admin.home',
        });
    }

    return next();
}
