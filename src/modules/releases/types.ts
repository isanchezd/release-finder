export interface Author {
	login: string;
	html_url: string;
	avatar_url?: string;
}

export interface Release {
	id: number;
	name: string;
	body: string;
	author: Author;
	created_at: string;
	html_url: string;
	isLatest?: boolean;
}

export interface FormValues {
	version: string;
	from: string;
	to: string;
	description: string;
	author: string;
}