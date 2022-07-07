<script lang="ts">
	type Icon = string;
	type Name = string;
	type Round = boolean;

	export let icon: Icon = '';
	export let name: Name = '';
	export let round: Round = false;
</script>

<div class="container champ-img" class:round>
	<img src={icon} alt={name} width="32" height="32" class="portrait" loading="lazy" />
</div>

<style lang="scss">
	.container {
		position: relative;
		width: 2rem;
		aspect-ratio: 1;
		overflow: hidden;

		&.round {
			border-radius: 50%;
		}
	}
	img {
		position: absolute;
		width: 120%;
		max-width: none;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
