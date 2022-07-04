<script lang="typescript">
	import { championData } from '$lib/stores';
	import HealthBar from '$lib/components/healthbar.svelte';
	import { statsAtLevel, formatVal } from '$lib/utils';

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
	$: yourChampionStats = statsAtLevel(yourChampion, yourInventory, yourChampionLvl);
	$: targetChampion = $championData[targetChampionId];
	$: targetInventory = [];
	$: targetChampionStats = statsAtLevel(targetChampion, targetInventory, targetChampionLvl);

	$: championsList = Object.values($championData).sort((a: Champion, b: Champion) => {
		return a.name.localeCompare(b.name);
	});
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
			<ul>
				<li>Health: {formatVal(yourChampionStats.health)}</li>
				<li>Armor: {formatVal(yourChampionStats.armor)}</li>
				<li>MR: {formatVal(yourChampionStats.magicResistance)}</li>
				<li>Attack Damage: {formatVal(yourChampionStats.attackDamage)}</li>
			</ul>
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
			<ul>
				<li>Health: {formatVal(targetChampionStats.health)}</li>
				<li>Armor: {formatVal(targetChampionStats.armor)}</li>
				<li>MR: {formatVal(targetChampionStats.magicResistance)}</li>
				<li>Attack Damage: {formatVal(targetChampionStats.attackDamage)}</li>
			</ul>
		{/if}
	</div>
</div>

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
</style>
