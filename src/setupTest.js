// @ts-nocheck
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Polyfill para HTMLFormElement.requestSubmit que no está implementado en jsdom
globalThis.HTMLFormElement =
	globalThis.HTMLFormElement ||
	class HTMLFormElement extends globalThis.HTMLElement {
		requestSubmit() {
			if (this.reportValidity()) {
				this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
			}
		}
	};

if (!HTMLFormElement.prototype.requestSubmit) {
	HTMLFormElement.prototype.requestSubmit = function () {
		if (this.reportValidity()) {
			this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
		}
	};
}

// Mock de svelte-markdown para evitar errores de lifecycle en tests
vi.mock('svelte-markdown', () => {
	return {
		default: function ($$anchor, $$props) {
			// Mock simple que renderiza el contenido source como texto plano
			const div = document.createElement('div');
			div.textContent = $$props.source || '';
			if ($$anchor && $$anchor.parentNode) {
				$$anchor.parentNode.insertBefore(div, $$anchor);
			}
			return {
				$destroy: () => div.remove(),
				$set: (new_props) => {
					if (new_props.source !== undefined) {
						div.textContent = new_props.source;
					}
				}
			};
		}
	};
});
