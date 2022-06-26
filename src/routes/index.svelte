<script>
	import { onMount } from 'svelte';

	async function loadData() {
		const data = await fetch('/data');
		const json = await data.json();

		return json.champions;
	}

	/** @type {Object} */
	let data = {};

	onMount(async () => {
		data = await loadData();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
