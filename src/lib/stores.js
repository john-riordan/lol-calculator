import { writable } from 'svelte/store';

type Store = Writable;

export const championData: Store = writable({});
export const itemsData: Store = writable({});
