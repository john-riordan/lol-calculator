<script>
	import LevelSelector from '$lib/components/level-selector.svelte';
	import HealthBar from '$lib/components/healthbar.svelte';
	import { statAtLevel, formatVal } from '$lib/utils';
	import { championData } from '$lib/stores';

	let level = 1;
	let sort = 'name';
	let desc = true;

	function setLevel(lvl) {
		level = lvl;
	}

	$: champions = Object.values($championData)
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
					attackRange,
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
				attackRange: statAtLevel(attackRange.flat, attackSpeed.perLevel, level),
				mana: statAtLevel(mana.flat, mana.perLevel, level),
				manaRegen: statAtLevel(manaRegen.flat, manaRegen.perLevel, level)
			};
		})
		.sort((a, b) => {
			const first = desc ? a : b;
			const last = desc ? b : a;

			return sort === 'name' ? first.name.localeCompare(last[sort]) : first[sort] - last[sort];
		});

	function setSort(col) {
		console.log('xxxx desc', sort, col);
		if (sort === col) {
			desc = !desc;
			return;
		}
		sort = col;
	}
</script>

<div class="content">
	<LevelSelector {level} {setLevel} />
	<table>
		<tr>
			<th on:click={() => setSort('name')} scope="col">Champion</th>
			<th on:click={() => setSort('health')} scope="col">Health</th>
			<th on:click={() => setSort('healthRegen')} scope="col">Health / 5</th>
			<th on:click={() => setSort('armor')} scope="col">Armor</th>
			<th on:click={() => setSort('magicResistance')} scope="col">MR</th>
			<th on:click={() => setSort('attackDamage')} scope="col">Atk.Dmg.</th>
			<th on:click={() => setSort('attackSpeed')} scope="col">Atk. Spd.</th>
			<th on:click={() => setSort('attackRange')} scope="col">Atk. Rng.</th>
			<th on:click={() => setSort('mana')} scope="col">Mana</th>
			<th on:click={() => setSort('manaRegen')} scope="col">Mana / 5</th>
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
				attackRange,
				mana,
				manaRegen
			} = champion}
			<tr>
				<td class="name">
					<div class="info">
						<HealthBar {name} {level} {health} portait={icon} />
					</div>
				</td>
				<td>{formatVal(health)}</td>
				<td>{formatVal(healthRegen, 1)}</td>
				<td>{formatVal(armor)}</td>
				<td>{formatVal(magicResistance)}</td>
				<td>{formatVal(attackDamage)}</td>
				<td>{formatVal(attackSpeed, 2)}</td>
				<td>{formatVal(attackRange)}</td>
				<td>{formatVal(mana)}</td>
				<td>{formatVal(manaRegen)}</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	:global(body) {
		padding: 4rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
	}

	th {
		user-select: none;
		cursor: pointer;
	}

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
