<script lang="ts">
	import { ABILITY_DMG_ICONS } from '$lib/constants';

	export let type: string = '';

	$: icon = ABILITY_DMG_ICONS[type];
</script>

<svelte:component this={icon} />
