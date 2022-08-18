import { writable } from 'svelte/store';

export const isDialogOpen = writable<boolean>(false);

/**
 * activeKey describes the item that is currently on screen.
 * When it changes, so too does the hash up top
 */
export const activeKey = writable<string | null>(null);

/**
 * scrollToKey describes the item that the viewer should scroll to.
 * If there's a hash up top, it will be used to set this value.
 */
export const scrollToKey = writable<string | null>(null);
