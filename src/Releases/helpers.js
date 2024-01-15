/**
 * Method for split the url in pieaces
 * @param {string} url
 */
export const splitUrl = (url) => {
	const REGEXP_PROTOCOL = /(^\w+:|^)\/\//;
	const urlReplaced = url.replace(REGEXP_PROTOCOL, '');
	const pieces = urlReplaced.split('/');
	return pieces;
};
