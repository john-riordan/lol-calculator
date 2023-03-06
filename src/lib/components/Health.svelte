<script>
	import ChampImg from '$lib/components/ChampImg.svelte';

	export let name = '';
	export let level = 10;
	export let health = 750;
	export let missingHealth = 0;
	export let portait = '';

	$: displayedHealth = health;

	$: {
		if (name === 'Kled') {
		}
	}

	$: tickCount = Math.floor((displayedHealth + 200) / 100);
	$: bars = [...new Array(tickCount)];
</script>

<div class="container" class:hasName={name}>
	{#if portait}
		<ChampImg icon={portait} round />
	{/if}
	<div class="info">
		{#if name}
			<div class="name-frame serif">
				<span class="name">{name}</span>
			</div>
		{/if}
		<div class="ui">
			<div class="level-frame frame">
				<div class="level">
					<span>{level}</span>
				</div>
			</div>
			<div class="health-and-mana frame">
				<div class="healthbar">
					<div class="ticks">
						{#each bars as bar, i}
							<div class="tick" class:large={i % 10 === 0} />
						{/each}
					</div>
					{#if missingHealth}
						<div class="missing-health" style:--missing-hp={missingHealth / displayedHealth} />
					{/if}
				</div>
				<div class="manabar" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;

		:global(.champ-img) {
			width: 3.5rem;
		}

		&.hasName {
			.info {
				transform: translateY(-4px);
			}
		}
	}

	.name-frame {
		display: flex;
		justify-content: center;
		padding-left: 12px;
	}
	.name {
		font-size: 12px;
		text-shadow: 1px 1px black;
		text-transform: capitalize;
	}
	.frame {
		padding: 2px;
		background: #5a5d5a;
		box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 20%), 0 0 0 2px hsl(0deg 0% 0%),
			inset 0 -1px 0 0 hsl(0deg 0% 0% / 20%);
	}
	.ui {
		display: flex;
		align-items: center;
	}
	.level-frame {
		position: relative;
		width: 25px;
		height: 28px;
		border-radius: 3px;
		clip-path: polygon(-2px -2px, 100% -2px, 100% calc(100% + 3px), -2px calc(100% + 3px));
		z-index: 1;
	}
	.level {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 21px;
		height: 24px;
		padding: 2px;
		font-size: 12px;
		text-shadow: 1px 1px black;
		letter-spacing: 0;
		background: linear-gradient(145deg, #102939 0%, #001c2b 100%);
		box-shadow: inset 0 0 0 1px black;
		border-radius: 3px;
	}

	.health-and-mana {
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding-left: 0;
		border-radius: 3px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.healthbar {
		position: relative;
		width: 105px;
		height: 11px;
		background: linear-gradient(
			to bottom,
			#52cf52 0%,
			#63cb5a 35%,
			#52a83f 53%,
			#318a21 75%,
			#298a21 100%
		);
		box-shadow: 0 0 0 1px hsla(0deg 0% 0% / 20%), inset 0 1px 0 0 hsla(0deg 0% 100% / 25%);
		border-radius: 2px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border: 1px solid black;
		overflow: hidden;
	}

	.ticks {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.missing-health {
		position: absolute;
		top: 0;
		right: 0;
		height: 9px;
		width: calc(var(--missing-hp) * 100%);
		background: black;
	}

	.manabar {
		height: 5px;
		width: 100%;
		background: linear-gradient(180deg, #42aade 0%, #42aade 100%);
		border: 1px solid black;
		border-radius: 2px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 15%);
	}

	.tick {
		width: 1px;
		height: 6px;
		background: black;

		&.large {
			width: 2px;
			height: 10px;
		}

		&:first-child,
		&:last-child {
			opacity: 0;
			width: 0;
		}
	}

	.portrait {
		border-radius: 3px;
		transform: translateY(8px);
	}
</style>
