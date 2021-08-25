<template>
	<v-container class="list" v-resize="onResize">
		<v-row>
			<v-col cols="12" xl="2">
				<search></search>
			</v-col>
			<v-col cols="12" xl="4">
				<app-filter></app-filter>
			</v-col>
		</v-row>
		<v-row class="hor pa-0">
			<v-col>
				<v-row justify="center" class="min-w-768">
					<v-col cols="2" class="pa-1 pa-xl-4">
						<table-header title="Изображение"></table-header>
					</v-col>
					<v-col cols="3" xl="2" class="pa-1 pa-xl-4">
						<table-header title="Название" orderBy="name"></table-header>
					</v-col>
					<v-col cols="3" xl="2" class="pa-1 pa-xl-4">
						<table-header title="Описание" orderBy="description"></table-header>
					</v-col>
					<v-col cols="2" class="pa-1 pa-xl-4">
						<table-header title="Адрес" orderBy="address"></table-header>
					</v-col>
					<v-col cols="2" class="pa-1 pa-xl-4">
						<table-header title="Контакты"></table-header>
					</v-col>
				</v-row>
				<v-row class="min-w-768">
					<v-col class="px-0 px-xl-4">
						<virtual-scroll
							:items="Libs"
							:itemHeight="mob ? 70 : 150"
							:pageVieportSize="showLibsAtOnce"
							:fullPageSize="Limit"
							:count="Count"
							:pos="scrollPosition"
							@scrollPosition="getDataPortionFromPos"
							ref="vs"
							class="
								bg-grey-lighten-4
								border-opacity-25 border
								text-grey-darken-4
								data-sheet
							"
						>
							<template v-slot:default="{ item }">
								<router-link custom :to="`/details/${item.id}`" v-slot="{ navigate }">
									<v-row
										v-if="item"
										no-gutters
										justify="center"
										class="data-sheet-item"
										@click="navigate"
									>
										<v-col v-if="item.image" cols="2" class="pa-1 pa-xl-4">
											<v-img
												:src="item.image.url"
												class="item-image"
												:alt="item.image.title"
											/>
										</v-col>
										<v-col v-else cols="2" class="pa-1 pa-xl-4">
											<v-icon>mdi-image-off-outline</v-icon>
										</v-col>
										<v-col cols="3" class="pa-1 pa-xl-4" xl="2">
											{{ item.name }}
										</v-col>
										<v-col cols="3" class="pa-1 pa-xl-4" xl="2">
											{{
												$filters.textLength(
													item.description,
													mob ? 40 : 140
												) + "..."
											}}
										</v-col>
										<v-col
											cols="2"
											class="pa-1 pa-xl-4"
											:style="{ overflow: mob ? 'hidden' : '' }"
										>
											{{ item.address }}
										</v-col>
										<v-col
											cols="2"
											class="pa-1 pa-xl-4"
											v-if="item.contacts"
											:style="{ overflow: mob ? 'hidden' : '' }"
										>
											<v-row v-if="item.contacts.email">
												<v-col class="pa-2 pa-xl-4">
													<span>e-mail: {{ item.contacts.email }}</span>
												</v-col>
											</v-row>
											<v-row v-if="item.contacts.website">
												<v-col class="pa-2 pa-xl-4">
													Сайт:
													<a :href="item.contacts.website">{{
														item.contacts.website
													}}</a>
												</v-col>
											</v-row>
											<v-row v-if="item.contacts.phones.length">
												<v-col
													cols="12"
													xl="4"
													:aria-rowspan="item.contacts.phones.length"
													class="pa-2 pa-xl-4"
												>
													{{
														item.contacts.phones.length > 1
															? "Номера телефонов"
															: "Номер телефона"
													}}
												</v-col>
												<v-col cols="12" xl="6" class="pa-1 pa-xl-4">
													<v-row
														v-for="phone in item.contacts.phones"
														:key="phone"
													>
														<v-col class="pa-1 pa-xl-4">{{
															phone.value
														}}</v-col>
													</v-row>
												</v-col>
											</v-row>
										</v-col>
										<v-col v-else cols="2">
											<v-icon>mdi-map-marker-off-outline</v-icon>
										</v-col>
									</v-row>
								</router-link>
							</template>
						</virtual-scroll>
					</v-col>
				</v-row>
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
import TableHeader from "@/components/table-header.vue";
import Search from "@/components/search.vue";
import AppFilter from "@/components/filter.vue";

interface IVirtualScroll {
	scroll(page: number): void;
}

@Options({
	components: {
		VirtualScroll,
		TableHeader,
		Search,
		AppFilter,
	},
})
export default class List extends Vue {
	scrollPosition = 0;
	showLibsAtOnce = 4;
	mob = false;

	get Libs(): Lib[] {
		return this.$store.getters.libs;
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

	getDataPortionFromPos(pos: number): void {
		this.scrollPosition = pos;
		const page = Math.ceil((this.scrollPosition + 1) / this.Limit);

		if (this.Page != page && page !== 0) {
			this.Page = page;
		}
	}

	paginator(): void {
		const vs = this.$refs["vs"] as IVirtualScroll;
		vs.scroll(this.Page);
	}

	onResize(): void {
		this.mob = window.innerWidth <= 1024;
	}
}
</script>

<style lang="scss" scoped>
.list {
	font-size: 16px;
}
.min-w-768 {
	min-width: 768px;
}
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
:deep .item-image img {
	max-height: 150px;
	height: auto;
	width: 150px;
}

:deep .hide-overlay {
	& button:focus .v-btn__overlay {
		opacity: 0;
	}
}
@media (max-width: 1024px) {
	.list {
		font-size: 14px;
	}
	.hor {
		overflow-x: scroll;
	}
}
</style>
