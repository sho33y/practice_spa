import { adminStore } from '@/stores/admin';

export default function guestAdmin({ next }) {
    const as = adminStore();

    if (as.isAuthenticated) {
        return next({
            name: 'admin.home',
        });
    }

    return next();
}
