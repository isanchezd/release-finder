import { derived, writable } from 'svelte/store';
import translations from './translations';

type Translations = typeof translations;
type Locale = keyof Translations;
type TranslationKey = keyof Translations[Locale];
type TranslationVars = Record<string, string | number>;

export const locale = writable<Locale>('en');
export const locales = Object.keys(translations) as Locale[];

const translate = (locale: Locale, key: TranslationKey, vars: TranslationVars = {}): string => {
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${String(key)}"`);

	let text: string = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${String(locale)}.${String(key)}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).forEach((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, String(vars[k]));
	});

	return text;
};

export const t = derived(
	locale,
	($locale) =>
		(key: TranslationKey, vars: TranslationVars = {}) =>
			translate($locale, key, vars)
);
