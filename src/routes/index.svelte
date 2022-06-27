<script>
	import { onMount } from 'svelte';
	import LevelSelector from '$lib/components/level-selector.svelte';
	import HealthBar from '$lib/components/healthbar.svelte';
	import { statAtLevel, formatVal } from '$lib/utils';

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

	let level = 1;
	let sort = 'name';
	let desc = true;

	function setLevel(lvl) {
		level = lvl;
	}

	$: champions = Object.values(data)
		.map((champion) => {
			const {
				id,
				icon,
				name,
				stats: {
					health,
					healthRegen,
					armor,
					magicResistance,
					attackDamage,
					attackSpeed,
					mana,
					manaRegen
				}
			} = champion;

			return {
				id,
				icon,
				name,
				health: statAtLevel(health.flat, health.perLevel, level),
				healthRegen: statAtLevel(healthRegen.flat, healthRegen.perLevel, level),
				armor: statAtLevel(armor.flat, armor.perLevel, level),
				magicResistance: statAtLevel(magicResistance.flat, magicResistance.perLevel, level),
				attackDamage: statAtLevel(attackDamage.flat, attackDamage.perLevel, level),
				attackSpeed: statAtLevel(attackSpeed.flat, attackSpeed.perLevel, level),
				mana: statAtLevel(mana.flat, mana.perLevel, level),
				manaRegen: statAtLevel(manaRegen.flat, manaRegen.perLevel, level)
			};
		})
		.sort((a, b) => (sort === 'name' ? a.name.localeCompare(b[sort]) : a[sort] - b[sort]));

	function setSort(col, desc) {
		if (sort === col) {
			desc = !desc;
			return;
		}
		sort = col;
	}

	$: console.log(data);
</script>

<LevelSelector {level} {setLevel} />

<table>
	<tr>
		<th on:click={() => setSort('name')} scope="col">Champion</th>
		<th on:click={() => (sort = '')} scope="col">Health bar</th>
		<th on:click={() => (sort = 'health')} scope="col">Health</th>
		<th on:click={() => (sort = 'healthRegen')} scope="col">Health / 5</th>
		<th on:click={() => (sort = 'armor')} scope="col">Armor</th>
		<th on:click={() => (sort = 'magicResistance')} scope="col">MR</th>
		<th on:click={() => (sort = 'attackDamage')} scope="col">AD</th>
		<th on:click={() => (sort = 'attackSpeed')} scope="col">AS</th>
		<th on:click={() => (sort = 'mana')} scope="col">Mana</th>
		<th on:click={() => (sort = 'manaRegen')} scope="col">Mana / 5</th>
	</tr>
	{#each champions as champion}
		{@const {
			icon,
			name,
			health,
			healthRegen,
			armor,
			magicResistance,
			attackDamage,
			attackSpeed,
			mana,
			manaRegen
		} = champion}
		<tr>
			<td class="name">
				<div class="info">
					<img src={icon} alt={name} loading="lazy" width="40" height="40" />
					<span>{name}</span>
				</div>
			</td>
			<td><HealthBar {health} /></td>
			<td>{formatVal(health)}</td>
			<td>{formatVal(healthRegen, 1)}</td>
			<td>{formatVal(armor)}</td>
			<td>{formatVal(magicResistance)}</td>
			<td>{formatVal(attackDamage)}</td>
			<td>{formatVal(attackSpeed, 2)}</td>
			<td>{formatVal(mana)}</td>
			<td>{formatVal(manaRegen)}</td>
		</tr>
	{/each}
</table>

<style lang="scss">
	td {
		padding: 0.25em;
		min-width: 10ch;
		text-align: center;
		border: 1px solid hsla(var(--c1-hsl) / 0.15);

		&.name {
			text-align: left;
		}
	}

	.info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
