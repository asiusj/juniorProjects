<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",

	data() {
		return {
			//
		};
	},
	mounted(): void {
		this.$store.dispatch("getLibs");
	},
});
</script>
