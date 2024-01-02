import { describe, test, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import Page__SvelteComponent_ from './+page.svelte';
import { getReleases } from '../repository';
import translations from '../i18n/translations';
import { API_RESPONSE, GITHUB_URL_WITHOUT_RELEASES, RELEASE, SUCESS_GITHUB_URL } from './__mocks__';

describe('Main Page test suite', () => {
	vi.mock('../repository');

	test('The component not should to show the form filter and not show the releases list', () => {
		render(Page__SvelteComponent_);

		expect(
			screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
		).toBeNull();
		expect(screen.queryByText('/loading.../i')).toBeNull();
	});

	test('When the repository input is incorrect format (not url) the component not should to show the form filter and not show the releases list', () => {
		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: 'aaa' }
			}
		);

		expect(getReleases).not.toHaveBeenCalled();
		expect(
			screen.queryByText(translations.en['page.field.repository-url.error'])
		).toBeInTheDocument();
	});

	test('When the repository input has a incorrect url (not githubs url) the component not should to show the form filter and not show the releases list', () => {
		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: 'https://www.google.es/1/2' }
			}
		);

		expect(getReleases).not.toHaveBeenCalled();
		expect(
			screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
		).toBeNull();
		expect(screen.queryByText('/loading.../i')).toBeNull();
	});

	test('When the repository input has a correct github url, the form filter and a releases list should be in the document', () => {
		vi.mocked(getReleases).mockResolvedValue(API_RESPONSE);

		const release = API_RESPONSE.find((release) => release.id === RELEASE.id);

		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: SUCESS_GITHUB_URL }
			}
		);

		expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');

		waitFor(() => {
			expect(
				screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			).toBeInTheDocument();
		});

		waitFor(() => {
			const releaseName = release?.name ? release?.name : '';
			expect(screen.queryByText(releaseName)).toBeInTheDocument();
		});
	});

	test('When the repository input has a correct github url but the repo hasn´t releases, the form filter should be in the document but the releases list not to be in the document', () => {
		vi.mocked(getReleases).mockResolvedValue([]);

		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: GITHUB_URL_WITHOUT_RELEASES }
			}
		);

		expect(getReleases).toHaveBeenCalledWith('kilimchoi', 'engineering-blogs');

		waitFor(() => {
			expect(
				screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			).toBeInTheDocument();
		});

		waitFor(() => {
			expect(screen.queryByText(translations.en['page.no-results'])).toBeInTheDocument();
		});
	});

	test('When the user puts in filter form and the value was in the list, the releases should be in the document', () => {
		vi.mocked(getReleases).mockResolvedValue(API_RESPONSE);

		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: SUCESS_GITHUB_URL }
			}
		);

		expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');

		waitFor(() => {
			expect(
				screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			).toBeInTheDocument();

			fireEvent.click(
				screen.getByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.version.placeholder']),
				{
					target: { value: RELEASE.name }
				}
			);

			expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');
		});

		waitFor(() => {
			expect(screen.queryByText(RELEASE.name)).toBeInTheDocument();
		});
	});

	test('When the user puts in filter form and the value was in the list, the releases should be in the document', () => {
		vi.mocked(getReleases).mockResolvedValue(API_RESPONSE);

		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: SUCESS_GITHUB_URL }
			}
		);

		expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');

		waitFor(() => {
			expect(
				screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			).toBeInTheDocument();

			fireEvent.click(
				screen.getByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.version.placeholder']),
				{
					target: { value: RELEASE.name }
				}
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.description.placeholder']),
				{
					target: { value: 'Fixed a duplicated' }
				}
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.author.placeholder']),
				{
					target: { value: RELEASE.author.login }
				}
			);

			expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');
		});

		waitFor(() => {
			expect(screen.queryByText(RELEASE.name)).toBeInTheDocument();
		});
	});

	test('When the user puts in filters form and the values don´t match, the releases should be in the document', () => {
		vi.mocked(getReleases).mockResolvedValue(API_RESPONSE);

		render(Page__SvelteComponent_);

		fireEvent.input(
			screen.getByPlaceholderText(translations.en['page.field.repository-url.placeholder']),
			{
				target: { value: SUCESS_GITHUB_URL }
			}
		);

		expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');

		waitFor(() => {
			expect(
				screen.queryByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			).toBeInTheDocument();

			fireEvent.click(
				screen.getByText(`/${translations.en['page.button.filter']}/i`, { selector: 'button' })
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.version.placeholder']),
				{
					target: { value: RELEASE.name }
				}
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.description.placeholder']),
				{
					target: { value: 'Fixed a duplicated' }
				}
			);

			fireEvent.input(
				screen.getByPlaceholderText(translations.en['page.field.author.placeholder']),
				{
					target: { value: 'pepe' }
				}
			);

			expect(getReleases).toHaveBeenCalledWith('strapi', 'strapi');
		});

		waitFor(() => {
			expect(screen.queryByText(RELEASE.name)).not.toBeInTheDocument();
		});
	});
});
