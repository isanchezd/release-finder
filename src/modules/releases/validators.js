/**
 * Method for validate the input or the url
 * @param {string} url
 */
export const isValidUrl = (url) => {
	const REGEXP_REPO_GITHUB = /((https:)|(http:))\/\/github\.com(?:\/[^\s/]+){2}/i;
	return REGEXP_REPO_GITHUB.test(url);
};

/**
 *
 * @param date {string}
 * @param from {string}
 * @param to {string}
 */
export const isDateBetweenInterval = (date, from, to) => {
	return (
		new Date(date).getTime() > new Date(from).getTime() &&
		new Date(date).getTime() < new Date(to).getTime()
	);
};



