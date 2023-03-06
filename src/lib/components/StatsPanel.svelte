<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import AD from '$lib/components/icons/AD.svelte';
	import AP from '$lib/components/icons/AP.svelte';
	import Armor from '$lib/components/icons/Armor.svelte';
	import MR from '$lib/components/icons/MR.svelte';
	import AttackSpeed from '$lib/components/icons/AttackSpeed.svelte';
	import CDR from '$lib/components/icons/CDR.svelte';
	import Crit from '$lib/components/icons/Crit.svelte';
	import MoveSpeed from '$lib/components/icons/MoveSpeed.svelte';
	import { formatVal } from '$lib/utils';

	export let stats = {
		attackDamage: 0,
		abilityPower: 0,
		armor: 0,
		magicResistance: 0,
		attackSpeed: 0,
		abilityHaste: 0,
		criticalStrikeChance: 0,
		movespeed: 0
	};
</script>

<Panel --padding="1rem">
	<ul class="cols">
		<li><AD /> <span class="serif">{formatVal(stats.attackDamage)}</span></li>
		<li><AP /> <span class="serif">{formatVal(stats.abilityPower)}</span></li>
		<li><Armor /> <span class="serif">{formatVal(stats.armor)}</span></li>
		<li><MR /> <span class="serif">{formatVal(stats.magicResistance)}</span></li>
		<li><AttackSpeed /> <span class="serif">{formatVal(stats.attackSpeed, 2)}</span></li>
		<li><CDR /> <span class="serif">{formatVal(stats.abilityHaste)}</span></li>
		<li>
			<Crit /> <span class="serif">{formatVal(stats.criticalStrikeChance, 0, 'percent')}</span>
		</li>
		<li><MoveSpeed /> <span class="serif">{formatVal(stats.movespeed)}</span></li>
	</ul>
</Panel>

<style lang="scss">
	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(4, 1fr);
		column-gap: 1.25rem;
		row-gap: 0.25rem;

		li {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		span {
			width: 5ch;
			color: hsl(0deg 0% 80%);
		}

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}
	}
</style>
