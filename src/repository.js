import { Octokit } from 'octokit';

/**
 * Function method to get releases from Api
 * @param {string} owner
 * @param {string} repo
 */

const getReleases = async (owner, repo) => {
	const PATH = `GET /repos/${owner}/${repo}/releases`;
	const octokit = new Octokit({});
	const options = {
		per_page: 99
	};

	const response = await octokit.request(PATH, options);
	const { data } = response;

	return data;
};

export { getReleases };
