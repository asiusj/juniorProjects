<template>
	<v-icon v-if="SortOrder === 'desc'">mdi-menu-up</v-icon>
	<v-icon v-else>mdi-menu-down</v-icon>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Order } from "@/models/sort";

@Options({})
export default class SortMark extends Vue {
	get SortOrder(): Order {
		return this.$store.state.sort.order;
	}
}
</script>
