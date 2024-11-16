export const createTask = (title) => ({
    id: Date.now().toString(),
    title,
    completed: false,
    priority: 0,
});