import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const champions = await fetch(
		'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
	);
	const data = await champions.json();

	return json(data);
}
