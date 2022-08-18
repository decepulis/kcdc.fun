import { writable } from 'svelte/store';

function cleanHash(hash: string) {
	return hash.replace('#', '');
}
function createHashStore() {
	const defaultValue = typeof location !== 'undefined' ? cleanHash(location.hash) : '';
	const { subscribe, set: writableSet } = writable<string>(defaultValue);

	type UpdateFn = (s: string) => string;
	let update = (updateFn: UpdateFn) => {
		return;
	};
	let set = (newHash: string) => {
		return;
	};

	if (typeof window !== 'undefined' && typeof location !== 'undefined') {
		set = (newHash: string | undefined) => {
			if (newHash === '' || typeof newHash === 'undefined') {
				// we do some extra steps here to make sure
				// the page doesn't jump on hash clear
				history.replaceState(null, null, '#');
				writableSet('');
			} else {
				location.hash = cleanHash(newHash);
			}
		};
		update = (updateFn: UpdateFn) => {
			const newHash = cleanHash(updateFn(location.hash));
			set(newHash);
		};

		window.addEventListener('hashchange', () => {
			writableSet(cleanHash(location.hash));
		});
	}

	return {
		subscribe,
		set,
		update
	};
}

export const hash = createHashStore();
