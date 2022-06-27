export function formatVal(val, precision = 0) {
	return new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	}).format(val);
}

export function statAtLevel(statFlat, statPerLevel, level = 1) {
	return statFlat + statPerLevel * (level - 1) * (0.7025 + 0.0175 * (level - 1));
}

export function statsAtLevel(champion, level = 1) {
	if (!champion || !champion.stats) return null;

	// const {
	// 	stats: { health, healthRegen, armor, magicResistance, mana, manaRegen, attackDamage }
	// } = champ;

	const statslist = ['health', 'healthRegen', 'armor'];
	const stats = {};

	for (const statKey of statslist) {
		const { flat, perLevel } = champ.stats[statKey];

		stats[statKey] = statAtLevel(flex, perLevel, level);
	}

	return stats;
}
