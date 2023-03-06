<script>
	export let src = '';
	export let alt = '';
	export let size = 36;
	export let isMythic = false;
</script>

<div class="frame-outer" class:isMythic>
	<div class="frame-inner">
		{#if src}
			<img {src} {alt} width={size} height={size} />
		{:else}
			<div class="empty" />
		{/if}
	</div>
</div>

<style lang="scss">
	.frame-outer,
	.frame-inner {
		width: 100%;

		aspect-ratio: 1;
	}
	.frame-outer {
		--border-color: hsl(var(--c1-hsl) / 0.15);
		max-width: var(--size, 2rem);
		padding: 1px;
		background: var(--border-color);

		&.isMythic {
			--border-color: var(--gold-gradient);
		}
	}
	.frame-inner {
		background: hsl(var(--c10-hsl) / 0.75);
		border: 1px solid var(--c10);
	}

	img,
	.empty {
		width: var(--size, 2rem);
		/* width: 100%; */
	}
</style>
