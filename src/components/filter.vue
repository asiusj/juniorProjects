<template>
	<div class="filter-container">
		<div class="filter-items" v-if="showFilter">
			<div class="filter-item">
				<div class="filter-item-title">Фильтр по регионам</div>
				<virtual-scroll
					:items="Regions"
					itemHeight="26"
					:pageVieportSize="10"
					:fullPageSize="10"
					:count="Regions.length"
					:pos="0"
				>
					<template v-slot:default="{ item }">
						<input
							type="checkbox"
							v-model.number="region"
							:value="item"
							@change="filterRegion"
						/>
						<label>{{ item }}</label>
					</template>
				</virtual-scroll>
			</div>
			<div class="filter-item">
				<div class="filter-item-title">Фильтр по часовым поясам</div>
				<virtual-scroll
					:items="TimeZones"
					itemHeight="26"
					:pageVieportSize="10"
					:fullPageSize="10"
					:count="TimeZones.length"
					:pos="0"
				>
					<template v-slot:default="{ item }">
						<input
							type="checkbox"
							v-model.number="timezone"
							:value="item"
							@change="filterTimeZone"
						/>
						<label>{{ item }}</label>
					</template>
				</virtual-scroll>
			</div>
		</div>
		<v-btn
			icon="mdi-filter-outline"
			@click="showFilter = !showFilter"
			size="small"
			style="box-shadow: none"
		></v-btn>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VirtualScroll from "@/components/virtual-scroll.vue";

@Options({
	components: {
		VirtualScroll,
	},
})
export default class Filter extends Vue {
	region = [];
	timezone = [];
	showFilter = false;

	filterRegion(): void {
		this.$store.commit("setFilterRegion", this.region);
	}

	filterTimeZone(): void {
		this.$store.commit("setFilterTimeZone", this.timezone);
	}

	get Regions(): string[] {
		return this.$store.state.filter.region.all;
	}

	get TimeZones(): string[] {
		return this.$store.state.filter.timezone.all;
	}
}
</script>

<style lang="scss" scoped>
.filter-container {
	display: flex;
	margin: 32px 0 6px;
	position: relative;
	.filter-items {
		display: flex;
		position: absolute;
		background: white;
		z-index: 1;
		box-shadow: 0px 0px 5px rgb(0 0 0 / 27%);
		top: 48px;
		width: 100%;
		.filter-item {
			width: 50%;
			padding: 8px;
			.filter-item-title {
				padding: 8px;
				margin: -8px -8px 8px;
				box-shadow: 0px 0px 3px rgb(0 0 0 / 27%);
				transition: box-shadow 0.3s;
				&:hover {
					box-shadow: 0px 2px 3px rgb(0 0 0 / 27%);
				}
			}
		}
	}
}
@media (max-width: 1024px) {
	.filter-container {
		margin: 12px 0 6px;
	}
}
</style>
