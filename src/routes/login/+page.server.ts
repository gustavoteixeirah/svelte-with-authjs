export const load = async (event) => {
	const session = await event.locals.getSession();
console.log("hi")
	return {
		session
	};
};