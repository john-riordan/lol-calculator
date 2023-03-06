import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const items = await fetch(
		'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json'
	);
	const data = await items.json();

	return json(data);
}
