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
		region?: {
			value: string[];
			all: string[];
		};
		timezone?: {
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
	},
	actions: {
		getLibs({ commit, state }) {
			axios
				.get(
					dbAddr + `?_sort=${state.sort.by}&_order=${state.sort.order}`
					// `?_page=${page || state.page}${
					// 	state.limit ? "&_limit=" + state.limit : ""
					// }&_sort=${state.sort.by}&_order=${state.sort.order}`
				)
				.then((res) => {
					commit("updateLibsList", res.data);
				});
		},
		sort({ commit }, sort: Sort) {
			commit("setSort", sort);
			commit("sortLibs");
		},
	},
	getters: {
		libs(state) {
			const libs = new Array(0).concat(state.libs);
			let res = libs;
			if (state.filter.search) {
				res = libs.filter((lib: Lib) => {
					if (state.filter.search) {
						return (
							lib.name.includes(state.filter.search) ||
							lib.description.includes(state.filter.search) ||
							lib.address.includes(state.filter.search)
						);
					}
				});
			}
			// if (state.filter.region) {
			// 	res = libs.filter((lib: Lib) => {
			// 		if (state.filter.region) {
			// 			return lib.locale.name.includes(state.filter.region);
			// 		}
			// 	});
			// }
			// if (state.filter.timezone) {
			// 	res = libs.filter((lib: Lib) => {
			// 		if (state.filter.timezone) {
			// 			return lib.locale.timezone.includes(state.filter.timezone);
			// 		}
			// 	});
			// }
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
