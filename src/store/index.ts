import { createStore } from "vuex";
import axios from "axios";
import Lib from "@/models/lib";
import Sort from "@/models/sort";

const dbAddr = "https://localhost:3000/libs";

export interface State {
	libs: Lib[];
	page: number;
	limit: number;
	sort: Sort;
	filter: {
		search?: string;
		region: {
			value: string[];
			all: string[];
		};
		timezone: {
			value: string[];
			all: string[];
		};
	};
}

export default createStore<State>({
	state: {
		libs: [],
		page: 1,
		limit: 10,
		sort: { by: "id", order: "asc" },
		filter: {
			search: "",
			region: {
				value: [],
				all: [],
			},
			timezone: {
				value: [],
				all: [],
			},
		},
	},
	mutations: {
		updateLibsList(state, libs: Lib[]) {
			const libsToAdd = libs.filter((lib) => {
				return !state.libs.some((_lib) => {
					return _lib.id === lib.id;
				});
			});
			state.libs = state.libs.concat(libsToAdd);
		},
		setPage(state, page: number) {
			state.page = page;
		},
		setSort(state, sort: Sort) {
			state.sort = sort;
		},
		sortLibs(state) {
			state.libs.sort((a, b) => {
				const o = state.sort.order === "asc" ? 1 : -1;
				return (a[state.sort.by] > b[state.sort.by] ? 1 : -1) * o;
			});
		},
		setFilterSearch(state, search: string) {
			state.filter.search = search;
		},
		setFilter(state, filter) {
			state.filter = filter;
		},
		setFilterRegion(state, region: string[]) {
			state.filter.region.value = region;
		},
		setFilterTimeZone(state, timeZone: string[]) {
			state.filter.timezone.value = timeZone;
		},
	},
	actions: {
		getLibs({ commit, state, dispatch }) {
			axios
				.get(
					dbAddr + `?_sort=${state.sort.by}&_order=${state.sort.order}`
					// `?_page=${page || state.page}${
					// 	state.limit ? "&_limit=" + state.limit : ""
					// }&_sort=${state.sort.by}&_order=${state.sort.order}`
				)
				.then((res) => {
					commit("updateLibsList", res.data);
					dispatch("createFilter");
				});
		},
		sort({ commit }, sort: Sort) {
			commit("setSort", sort);
			commit("sortLibs");
		},
		createFilter({ state, commit }) {
			const locales: { [key: string]: boolean } = {};
			const timeZones: { [key: string]: boolean } = {};
			state.libs.forEach((lib: Lib) => {
				locales[lib.locale.name] = true;
				timeZones[lib.locale.timezone] = true;
			});
			commit("setFilter", {
				search: "",
				region: {
					value: [],
					all: Object.keys(locales),
				},
				timezone: {
					value: [],
					all: Object.keys(timeZones),
				},
			});
		},
	},
	getters: {
		libs(state) {
			const libs = new Array(0).concat(state.libs);
			let res = libs;
			if (state.filter.search) {
				res = res.filter((lib: Lib) => {
					if (state.filter.search) {
						return (
							lib.name.includes(state.filter.search) ||
							lib.description.includes(state.filter.search) ||
							lib.address.includes(state.filter.search)
						);
					}
				});
			}
			if (state.filter.region.value.length) {
				res = res.filter((lib: Lib) => {
					return state.filter.region.value.some((region) => {
						return lib.locale.name === region;
					});
				});
			}
			if (state.filter.timezone.value.length) {
				res = res.filter((lib: Lib) => {
					return state.filter.timezone.value.some((tz) => {
						return lib.locale.timezone === tz;
					});
				});
			}
			return res;
		},
		// sorted(state) {
		// 	const ls = new Array(0).concat(state.libs);
		// 	return ls.sort((a, b) => {
		// 		return a[state.sort.by] > b[state.sort.by] ? 1 : -1;
		// 	});
		// },
	},
	modules: {},
});
