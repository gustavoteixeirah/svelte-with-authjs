import { SvelteKitAuth } from '@auth/sveltekit';
import { registerOpenTelemetry } from '$lib/adapters/opentelemetry';
import  '$lib/adapters/telemetry';
import GitHub from '@auth/sveltekit/providers/github';
import Google from '@auth/sveltekit/providers/google';

import {
	AUTH_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';

await registerOpenTelemetry();

export const handle = async () => {
	const options = {
		providers: [GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		}),
			Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
			pages: {
		signIn: '/login',
			signOut: '/login'
	},
		trustHost: true,
			secret: AUTH_SECRET
	}

	return SvelteKitAuth(options);
};

