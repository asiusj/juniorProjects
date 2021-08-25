<template>
	<v-btn v-if="orderBy" class="th-button hide-overlay" variant="outlined" @click="sort">
		<span>{{ title }}</span>
		<v-icon class="th-button-hover-icon" v-if="Sort.by !== orderBy">mdi-menu-down</v-icon>
		<sort-mark v-if="Sort.by === orderBy"></sort-mark>
	</v-btn>
	<v-btn v-else class="th-button hide-overlay" variant="outlined" disabled>{{ title }}</v-btn>
</template>

<script lang="ts">
import Sort, { By } from "@/models/sort";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import SortMark from "@/components/sort-mark.vue";

@Options({
	components: {
		SortMark,
	},
})
export default class TableHeader extends Vue {
	@Prop() title!: string;
	@Prop({ default: undefined }) orderBy?: By;

	get Sort(): Sort {
		return this.$store.state.sort;
	}

	sort(): void {
		this.$emit("sort", this.orderBy);
	}
}
</script>

<style lang="scss" scoped>
.th-button {
	border: none;
	color: #000000;
	width: 100%;
	display: block;
	text-align: left;
	&:focus {
		background: none;
		:deep .v-btn__overlay {
			opacity: 0;
		}
	}
	.th-button-hover-icon {
		display: none;
	}
	&:hover .th-button-hover-icon {
		display: inline;
	}
}
</style>
