<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { MYTHICS } from '$lib/constants';
	import Panel from '$lib/components/Panel.svelte';
	import ItemImg from '$lib/components/ItemImg.svelte';

	const dispatch = createEventDispatcher();

	export let items: any = [];
	$: slots = [...new Array(6)];
</script>

<Panel --padding="1rem">
	<ul class="inventory">
		{#each slots as slot, i}
			{@const itemId = items[i]?.id}
			<li
				on:click={(e) => {
					e.preventDefault();
					dispatch('itemClick', itemId);
				}}
				on:contextmenu={(e) => {
					e.preventDefault();
					dispatch('itemClick', itemId);
				}}
			>
				<ItemImg
					src={items[i]?.icon}
					alt={items[i]?.name}
					--size="32px"
					isMythic={MYTHICS[itemId]}
				/>
			</li>
		{/each}
	</ul>
</Panel>

<style lang="scss">
	.inventory {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr 1fr;
		grid-auto-rows: auto;
		gap: 0.25rem;
		list-style: none;

		li {
			cursor: pointer;
		}
	}
</style>
