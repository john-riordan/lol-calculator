import { MYTHICS } from '$lib/constants';

export function formatVal(val, precision = 0, style = 'decimal') {
	if (!val) return 0;
	return new Intl.NumberFormat('en-US', {
		style,
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	}).format(val);
}

export function statAtLevel(statFlat, statPerLevel, level = 1) {
	return statFlat + statPerLevel * (level - 1) * (0.7025 + 0.0175 * (level - 1));
}

export function statsAtLevel(champion, items = [], level = 1) {
	if (!champion || !champion.stats) return {};

	const stats = {};

	// Parse champion stats
	for (const statKey in champion.stats) {
		const stat = champion.stats[statKey];
		const { flat, perLevel } = champion.stats[statKey];
		if (!stats[statKey]) stats[statKey] = 0;
		stats[statKey] += statAtLevel(flat, perLevel, level);
	}
	if (!stats.abilityHaste) stats.abilityHaste = 0;

	// Parse items
	let mythicBonuses = {};
	const legendaryItemCount = items.reduce((acc, curr) => {
		if (curr.tier >= 3) acc += 1;
		return acc;
	}, 0);
	for (const item of items) {
		const { id, stats: itemStats, passives } = item;
		const isMythic = Boolean(MYTHICS[id]);

		// Basic item stats
		for (const statKey of Object.keys(itemStats)) {
			const stat = itemStats[statKey];
			if (!stats[statKey]) stats[statKey] = 0;
			if (stat.flat) {
				stats[statKey] += stat.flat;
			} else if (stat.percent) {
				stats[statKey] += stat.percent / 100;
			}
		}

		// Item passive stats
		for (const passive of passives) {
			const { stats: passiveStats, mythic: isMythicPassive } = passive;

			for (const statKey of Object.keys(passiveStats)) {
				let stat = passiveStats[statKey];
				// BUG: sometimes the stat is an arr instead of an obj
				if (stat?.length) stat = stat[0];
				if (!stat.flat) continue;
				if (isMythicPassive) {
					if (!mythicBonuses[statKey]) mythicBonuses[statKey] = 0;
					mythicBonuses[statKey] += stat.flat;
				} else {
					if (!stats[statKey]) stats[statKey] = 0;
					stats[statKey] += stat.flat;
				}
			}
		}
	}

	// Mythic bonuses
	for (const statKey in mythicBonuses) {
		const val = mythicBonuses[statKey];
		if (!stats[val]) stats[val] = 0;
		stats[statKey] += val * legendaryItemCount;
	}

	return stats;
}

export function purchaseableItems(items) {
	return items.filter((item) => {
		return !item.removed && item.shop.purchasable;
	});
}

export function isLegendaryItem(item) {
	return item.tier >= 3 && !MYTHICS[item.id];
}
