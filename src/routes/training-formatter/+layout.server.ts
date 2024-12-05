import { EXERCISES_DB_ID } from '$env/static/private';
import notion from './_utilities/notion-client';
import { formatResultsForSelect } from './_utilities/trainings';

export async function load() {
	const trainingsPromise = notion.databases.query({
		database_id: EXERCISES_DB_ID,
		filter: {
			property: 'Type',
			select: {
				equals: 'Entraînement'
			}
		}
	});
	return {
		trainingsPromise,
		trainingsForSelectPromise: trainingsPromise.then((trainings) => {
			return formatResultsForSelect(trainings.results);
		})
	};
}
