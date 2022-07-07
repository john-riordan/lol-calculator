<div class="panel-outer">
	<div class="panel-inner">
		<slot />
	</div>
</div>

<style lang="scss">
	.panel-outer {
		padding: 1px;
		background: var(--gold-gradient);
	}
	.panel-inner {
		padding: var(--padding, 1.25rem);
		background: var(--c9);
	}
</style>
