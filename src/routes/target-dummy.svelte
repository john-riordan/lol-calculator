<script lang="typescript">
	import { championData, itemsData } from '$lib/stores';
	import HealthBar from '$lib/components/HealthBar.svelte';
	import Inventory from '$lib/components/Inventory.svelte';
	import StatsPanel from '$lib/components/StatsPanel.svelte';
	import { statsAtLevel, formatVal, purchaseableItems } from '$lib/utils';

	let itemModal: HTMLDialogElement;
	let searchInput: HTMLInputElement;
	let itemSearch = '';
	let yourChampionId = 0;
	let yourChampionLvl = 1;
	let targetChampionId = 0;
	let targetChampionLvl = 1;

	type Champion = {
		id: number;
		name: string;
	};

	$: yourChampion = $championData[yourChampionId];
	$: yourInventory = [];
	$: yourItems = yourInventory.map((id) => $itemsData[id]).filter(Boolean);
	$: yourChampionStats = statsAtLevel(yourChampion, yourItems, yourChampionLvl);
	$: targetChampion = $championData[targetChampionId];
	$: targetInventory = [];
	$: targetItems = targetInventory.map((id) => $itemsData[id]).filter(Boolean);
	$: targetChampionStats = statsAtLevel(targetChampion, targetInventory, targetChampionLvl);

	$: championsList = Object.values($championData).sort((a: Champion, b: Champion) => {
		return a.name.localeCompare(b.name);
	});

	$: itemsList = Object.values($itemsData)
		.filter((item) => {
			return item.name.toLowerCase().includes(itemSearch.toLowerCase());
		})
		.sort((a, b) => b.shop.prices.total - a.shop.prices.total);

	function openModal() {
		itemModal?.showModal();
		searchInput?.focus();
	}
	function closeModal() {
		itemModal?.close();
		searchInput?.blur();
		itemSearch = '';
	}
	function addItem(inventory: [], itemId: number) {
		return [...inventory, itemId];
	}
	function removeItem(inventory: [], itemId: number) {
		return inventory.filter((item) => item !== itemId);
	}
	function handleItemClick(event: Event) {
		if (event.detail) {
			yourInventory = removeItem(yourInventory, event.detail);
		} else {
			openModal();
		}
	}
</script>

<div class="blocks">
	<div class="champion-block">
		{#if !yourChampionId}
			<h3>Your Champion</h3>
			<select bind:value={yourChampionId}>
				<option value={0}>Select your champion</option>
				{#each championsList as champ}
					<option value={champ.id}>{champ.name}</option>
				{/each}
			</select>
		{:else if yourChampion.id}
			<h3>{yourChampion.name}</h3>
			<img src={yourChampion.icon} alt={yourChampion.name} width="52" height="52" />
			<input type="number" min="1" max="18" bind:value={yourChampionLvl} />
			<HealthBar level={yourChampionLvl} health={yourChampionStats.health} />
			<StatsPanel stats={yourChampionStats} />
			<Inventory items={yourItems} on:itemClick={handleItemClick} />
		{/if}
	</div>

	<div class="champion-block">
		{#if !targetChampionId}
			<h3>Target Champion</h3>
			<select bind:value={targetChampionId}>
				<option value={0}>Select target champion</option>
				{#each championsList as champ}
					<option value={champ.id}>{champ.name}</option>
				{/each}
			</select>
		{:else if targetChampion.id}
			<h3>{targetChampion.name}</h3>
			<img src={targetChampion.icon} alt={targetChampion.name} width="52" height="52" />
			<input type="number" min="1" max="18" bind:value={targetChampionLvl} />
			<HealthBar level={targetChampionLvl} health={targetChampionStats.health} />
			<StatsPanel stats={targetChampionStats} />
			<Inventory items={targetItems} on:itemClick={handleItemClick} />
		{/if}
	</div>
</div>

<dialog bind:this={itemModal}>
	<div class="items-modal">
		<div class="controls">
			<input type="text" bind:value={itemSearch} bind:this={searchInput} />
			<button on:click={closeModal}>Close</button>
		</div>
		<ul class="items-list">
			{#each purchaseableItems(itemsList) as item}
				<li>
					<button
						class="item"
						on:click={() => {
							yourInventory = addItem(yourInventory, item.id);
							closeModal();
						}}
					>
						<img src={item.icon} alt={item.name} width="24" height="24" />
						<span>{item.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</dialog>

<style lang="scss">
	.blocks {
		display: flex;
		gap: 4rem;
	}
	.champion-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
		padding: 2rem;
		border: 2px solid hsl(var(--c1-hsl) / 0.15);

		select {
			font-size: 1.25rem;
		}
	}

	dialog::backdrop {
		background: hsla(210deg, 90%, 4%, 0.75);
		backdrop-filter: blur(5px);
	}
	.items-modal {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.items-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;

		.item {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
