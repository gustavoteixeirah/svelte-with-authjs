<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
	documentation</p>

{#if $page.data.session}
	<button on:click={() => signOut()}>
		Sign out
	</button>
	<pre>
		{JSON.stringify($page.data.session, null, 2)}
	</pre>
{:else}
	<button on:click={() => signIn()}>
		Sign in
	</button>
{/if}
<h2>Admin access only</h2>
<a href="/admin">click here</a>

