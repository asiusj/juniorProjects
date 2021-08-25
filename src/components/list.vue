<template>
	<v-container>
		<v-row>
			<v-col cols="4">
				<search></search>
			</v-col>
			<v-col cols="8">
				<filter></filter>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="2 pl-0">
				<table-header title="Изображение"></table-header>
			</v-col>
			<v-col cols="2 pl-0">
				<table-header title="Название" orderBy="name" @sort="sort"></table-header>
			</v-col>
			<v-col cols="2 pl-0">
				<table-header title="Описание" orderBy="description" @sort="sort"></table-header>
			</v-col>
			<v-col cols="2 pl-0">
				<table-header title="Адрес" orderBy="address" @sort="sort"></table-header>
			</v-col>
			<v-col cols="2 pl-0">
				<table-header title="Контакты"></table-header>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<virtual-scroll
					:items="LibsToShow"
					itemHeight="150"
					:pageVieportSize="showLibsAtOnce"
					:fullPageSize="Limit"
					:count="Count"
					:pos="scrollPosition"
					@scrollPosition="getDataPortionFromPos"
					ref="vs"
					class="bg-grey-lighten-4 border-opacity-25 border text-grey-darken-4 data-sheet"
				>
					<template v-slot:default="{ item }">
						<v-row v-if="item" no-gutters justify="center" class="data-sheet-item">
							<v-col v-if="!item.image" cols="2 pa-4">
								<v-img
									:src="item.image.url"
									class="item-image"
									:alt="item.image.title"
								/>
							</v-col>
							<v-col v-else cols="2 pa-4">
								<v-icon>mdi-image-off-outline</v-icon>
							</v-col>
							<v-col cols="2 pa-4">
								{{ item.name }}
							</v-col>
							<v-col cols="2 pa-4">
								{{ $filters.textLength(item.description, 140) + "..." }}
							</v-col>
							<v-col cols="2 pa-4">
								{{ item.address }}
							</v-col>
							<v-col cols="2 pa-4" v-if="item.contacts">
								<v-row v-if="item.contacts.email">
									<v-col>
										<span>e-mail: {{ item.contacts.email }}</span>
									</v-col>
								</v-row>
								<v-row v-if="item.contacts.website">
									<v-col>
										Сайт:
										<a :href="item.contacts.website">{{
											item.contacts.website
										}}</a>
									</v-col>
								</v-row>
								<v-row v-if="item.contacts.phones.length">
									<v-col cols="4" :aria-rowspan="item.contacts.phones.length">
										{{
											item.contacts.phones.length > 1
												? "Номера телефонов"
												: "Номер телефона"
										}}
									</v-col>
									<v-col cols="6">
										<v-row v-for="phone in item.contacts.phones" :key="phone">
											<v-col>{{ phone.value }}</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-col>
							<v-col v-else cols="2">
								<v-icon>mdi-map-marker-off-outline</v-icon>
							</v-col>
						</v-row>
					</template>
				</virtual-scroll>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="3">
				<v-pagination
					class="hide-overlay"
					v-if="PagesCount"
					v-model="Page"
					:length="PagesCount"
					@click="paginator"
				></v-pagination>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Lib from "@/models/lib";
import { Vue, Options } from "vue-class-component";
import VirtualScroll from "@/components/virtual-scroll.vue";
import Sort, { By } from "@/models/sort";
import TableHeader from "@/components/table-header.vue";
import Search from "@/components/search.vue";

interface IVirtualScroll {
	scroll(page: number): void;
}

@Options({
	components: {
		VirtualScroll,
		TableHeader,
		Search,
	},
})
export default class List extends Vue {
	scrollPosition = 0;
	showLibsAtOnce = 4;
	currentLoaded = false;
	nextLoaded = false;

	get LibsToShow(): Lib[] {
		const start = this.scrollPosition;
		const end = start + this.showLibsAtOnce;
		return this.$store.getters.libs.slice(start, end);
	}

	set Page(v: number) {
		this.$store.commit("setPage", v);
	}

	get Page(): number {
		return this.$store.state.page;
	}

	get PagesCount(): number {
		return Math.ceil(this.$store.getters.libs.length / this.Limit);
	}

	get Count(): number | undefined {
		return this.$store.getters.libs.length;
	}

	get Limit(): number {
		return this.$store.state.limit;
	}

	get Sort(): Sort {
		return this.$store.state.sort;
	}

	getDataPortionFromPos(pos: number): void {
		this.scrollPosition = pos;
		const page = Math.ceil((this.scrollPosition + 1) / this.Limit);

		if (this.Page != page && page !== 0) {
			this.Page = page;
		}
	}

	mounted(): void {
		this.$store.dispatch("getLibs");
		// const p = this.$refs["pagination"] as HTMLElement;
		// console.log(p);
		// p.querySelector("button")?.addEventListener("click", () => {
		//
		// });
	}

	paginator(): void {
		const vs = this.$refs["vs"] as IVirtualScroll;
		vs.scroll(this.Page);
	}

	sort(by: By): void {
		let sort = this.Sort;
		if (this.Sort.by === by && this.Sort.order === "asc") {
			sort.order = "desc";
			sort.by = by;
		} else if (this.Sort.by === by && this.Sort.order === "desc") {
			sort.by = "id";
			sort.order = "asc";
		} else {
			sort.by = by;
			sort.order = "asc";
		}
		this.$store.dispatch("sort", sort);
	}
}
</script>

<style lang="scss" scoped>
.data-sheet {
	font-size: 0.8em;
	.data-sheet-item {
		cursor: pointer;
		transition: background 0.3s;
		height: 100%;
	}
	.data-sheet-item:hover {
		background: white;
	}
}
.item-image {
	max-height: 150px;
	height: auto;
	width: 150px;
}

:deep .hide-overlay {
	& button:focus .v-btn__overlay {
		opacity: 0;
	}
}
</style>
