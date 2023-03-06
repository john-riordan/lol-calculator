const CHAMPIONS = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json';
const ITEMS = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json';

export async function load({ fetch }) {
	let championData = [];
	let itemsData = [];

	await Promise.all([fetch(CHAMPIONS), fetch(ITEMS)])
		.then(function (responses) {
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then(function (data) {
			championData = data[0];
			itemsData = data[1];
		})
		.catch(function (error) {
			console.log(error);
		});

	return {
		champions: championData,
		items: itemsData
	};
}
