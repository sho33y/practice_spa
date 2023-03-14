import { memberStore } from '@/stores/member';

export default function guestMember({ next }) {
    const ms = memberStore();

    if (ms.isAuthenticated) {
        return next({
            name: 'member.home',
        });
    }

    return next();
}
