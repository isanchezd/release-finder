import { Octokit } from 'octokit';
import type { Release } from './types';

const getReleases = async (owner: string, repo: string): Promise<Release[]> => {
	const PATH = `GET /repos/${owner}/${repo}/releases`;
	const octokit = new Octokit({});
	const options = {
		per_page: 99
	};

	let response: { data: unknown } | null = null;

	try {
		response = await octokit.request(PATH, options) as { data: unknown };
	} catch (error) {
		console.error(error);
		return [];
	}

	return (response?.data as Release[]) ?? [];
};

export { getReleases };
