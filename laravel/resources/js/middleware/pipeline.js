export default function middlewarePipeline(middleware, context, index) {
    const nextMiddleware = middleware[index];

    if (!nextMiddleware) {
        return context.next;
    }

    return (params) => {
        if (params) {
            return context.next(params);
        }

        nextMiddleware({
            ...context,
            next: middlewarePipeline(middleware, context, index + 1),
        });
    };
}
