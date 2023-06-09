import { writable } from "svelte/store"

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[]
    filtered: T[]
    search: string
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(
    data: T[],
    ) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data: data,
        filtered: data,
        search: "",
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const searchHandler = (store: SearchStoreModel<{ site: string; sitecode: string; statecd: string; stateab: string }>) => {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item) => {
      return item.site.toLowerCase().includes(searchTerm);
    });
  };