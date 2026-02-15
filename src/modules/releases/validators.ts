export const isValidUrl = (url: string): boolean => {
	const REGEXP_REPO_GITHUB = /((https:)|(http:))\/\/github\.com(?:\/[^\s/]+){2}/i;
	return REGEXP_REPO_GITHUB.test(url);
};

export const isDateBetweenInterval = (date: string, from: string, to: string): boolean => {
	return (
		new Date(date).getTime() > new Date(from).getTime() &&
		new Date(date).getTime() < new Date(to).getTime()
	);
};



