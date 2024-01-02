import { derived, writable } from 'svelte/store';
import translations from './translations';

export const locale = writable('en');
export const locales = Object.keys(translations);

/**
 * 
 * @param {string} locale 
 * @param {string} key 
 * @param {any} vars 
 * @returns {string}
 */
const translate = (locale, key, vars) => {
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	/**
	 * Grab the translation from the translations object.
	 * @type {string}
	 */
	let text = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key, vars = {}) =>
			translate($locale, key, vars)
);
