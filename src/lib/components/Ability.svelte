<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import AbilityImg from '$lib/components/AbilityImg.svelte';
	import DamageIcon from '$lib/components/icons/Damage.svelte';
	import { ABILITY_DMG_TYPES } from '$lib/constants';
	import { abilityDamageAtLevel } from '$lib/utils';

	export let ability: any = [];
	export let championStats: any = {};

	let abilityLevel = 1;

	$: details = ability[0];
	$: abilityDamage = abilityDamageAtLevel(details, abilityLevel, championStats);
</script>

<Panel>
	<div class="frame">
		<AbilityImg src={details.icon} alt={details.name} --size="40px" />
		<div class="info">
			<h4 class="ability-name">{details.name}</h4>
			<p class="ability-description">{details.blurb}</p>
			{#if abilityDamage}
				<div class="ability-damage">
					<DamageIcon type={details.damageType} />
					<p style:color={ABILITY_DMG_TYPES[details.damageType]} class="serif">
						{abilityDamage} damage
					</p>
				</div>
			{/if}
		</div>
	</div>
</Panel>

<style lang="scss">
	.frame {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.info {
		flex: 1;
	}

	.ability-name {
		margin: 0;
	}
	.ability-description {
		font-size: 0.75em;
	}
	.ability-damage {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}
	}
</style>
