<script>
	export let health = 750;

	$: tickCount = Math.floor(health / 100);
	$: bars = [...new Array(tickCount)];
</script>

<div class="healthbar">
	{#each bars as bar, i}
		<div class="tick" class:large={i === 10 || i === 20} />
	{/each}
</div>

<style lang="scss">
	.healthbar {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 105px;
		height: 11px;
		border: 1px solid black;
		background: linear-gradient(
			to bottom,
			#52cf52 0%,
			#63cb5a 35%,
			#52a83f 53%,
			#318a21 75%,
			#298a21 100%
		);
	}

	.tick {
		width: 1px;
		height: 6px;
		background: black;

		&.large {
			width: 2px;
			height: 11px;
		}

		&:first-child,
		&:last-child {
			opacity: 0;
			width: 0;
		}
	}
</style>
