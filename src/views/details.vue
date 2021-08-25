<template>
	<Header />
	<detail :itemId="Id"></detail>
	<Footer />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Detail from "@/components/detail.vue";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

@Options({
	components: {
		Header,
		Footer,
		Detail,
	},
})
export default class Details extends Vue {
	get Id(): number {
		const id = this.$route.params.id as string;
		return parseInt(id);
	}
}
</script>
