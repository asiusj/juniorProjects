<template>
	<Header />
	<list></list>
	<Footer />
</template>

<script lang="ts">
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import List from "@/components/list.vue";
import { Options, Vue } from "vue-class-component";

@Options({
	components: {
		Header,
		Footer,
		List,
	},
})
export default class Home extends Vue {}
</script>
