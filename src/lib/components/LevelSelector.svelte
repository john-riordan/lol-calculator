<script>
	import { LVLS } from '$lib/constants';

	export let level = 1;
	export let setLevel = () => {};
</script>

<ol>
	{#each LVLS as lvl}
		<li><button on:click={() => setLevel(lvl)} class:active={level === lvl}>{lvl}</button></li>
	{/each}
</ol>

<style lang="scss">
	ol {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;

		li {
			&:not(:last-child) {
				button {
					border-right: none;
				}
			}
		}

		button {
			border: none;
			margin: 0;
			padding: 0;
			height: 2rem;
			aspect-ratio: 1;
			cursor: pointer;
			background: transparent;
			box-shadow: 0 0 0 1px hsla(var(--c1-hsl) / 0.25);

			&:hover {
				background: hsla(var(--c1-hsl) / 0.15);
			}

			&.active {
				background: hsla(var(--c1-hsl) / 0.25);
			}
		}
	}
</style>
