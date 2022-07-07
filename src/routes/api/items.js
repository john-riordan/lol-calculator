export async function get() {
	const data = await fetch(
		'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json'
	);
	const res = await data.json();

	if (res) {
		return {
			body: res
		};
	}

	return {
		status: 404
	};
}
