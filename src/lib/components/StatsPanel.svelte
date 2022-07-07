<script>
	import Panel from '$lib/components/Panel.svelte';
	import { formatVal } from '$lib/utils';

	export let stats = {};
</script>

<Panel>
	<ul class="cols">
		<li>AD: {formatVal(stats.attackDamage) || 0}</li>
		<li>AP: {formatVal(stats.abilityPower) || 0}</li>
		<li>AR: {formatVal(stats.armor) || 0}</li>
		<li>MR: {formatVal(stats.magicResistance) || 0}</li>
		<li>AS: {formatVal(stats.attackSpeed, 2) || 0}</li>
		<li>CDR: {formatVal(stats.abilityHaste) || 0}</li>
		<li>Crit: {formatVal(stats.criticalStrikeChance || 0, 0, 'percent')}</li>
		<li>MS: {formatVal(stats.movespeed) || 0}</li>
	</ul>
</Panel>

<style>
	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(4, 1fr);
		column-gap: 1rem;
	}
</style>
