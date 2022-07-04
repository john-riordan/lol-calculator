export async function get() {
	const data = await fetch(
		'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
	);
	const res = await data.json();

	if (res) {
		const champions = Object.keys(res).reduce((acc, curr) => {
			const {
				abilities,
				adaptiveType,
				attackType,
				icon,
				id,
				key,
				name,
				patchLastChanged,
				stats,
				roles,
				title
			} = res[curr];
			acc[id] = {
				abilities,
				adaptiveType,
				attackType,
				icon,
				id,
				key,
				name,
				patchLastChanged,
				stats,
				roles,
				title
			};
			return acc;
		}, {});

		return {
			body: champions
		};
	}

	return {
		status: 404
	};
}
