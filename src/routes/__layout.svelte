<script>
	import { onMount } from 'svelte';
	import { championData, itemsData } from '$lib/stores';

	onMount(async () => {
		Promise.all([fetch('/api/champions'), fetch('/api/items')])
			.then(function (responses) {
				return Promise.all(
					responses.map(function (response) {
						return response.json();
					})
				);
			})
			.then(function (data) {
				championData.set(data[0]);
				itemsData.set(data[1]);
			})
			.catch(function (error) {
				console.log(error);
			});
	});
</script>

<slot />
