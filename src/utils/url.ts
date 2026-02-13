export const splitUrl = (url: string): string[] => {
	const REGEXP_PROTOCOL = /(^\w+:|^)\/\//;
	const urlReplaced = url.replace(REGEXP_PROTOCOL, '');
	const pieces = urlReplaced.split('/');
	return pieces;
};
