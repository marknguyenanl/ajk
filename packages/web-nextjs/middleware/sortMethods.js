const sortMethodMiddleware = (store) => (next) => (action) => {
	if (action.type === "tasks/fetchSuccess") {
		const sortedTasks = action.payload.sort((a, b) =>
			a.title.localeCompare(b.title),
		);
		store.dispatch({ type: "tasks/setTasks", payload: sortedTasks });
	}
	return next(action);
};
