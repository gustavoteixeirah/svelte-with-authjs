import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Google from '@auth/sveltekit/providers/google';
import type { Handle } from '@sveltejs/kit';
import { GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET, AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const handle: Handle = SvelteKitAuth({
	providers: [GitHub({
		clientId: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET
	}),
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
	pages: {
		signIn: '/login',
		signOut: '/login'
	},
	secret: AUTH_SECRET
});