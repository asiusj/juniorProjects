<template>
	<v-app-bar density="compact">
		<v-app-bar-title>Libs</v-app-bar-title>
		<v-spacer></v-spacer>
		<v-btn target="blank" href="https://github.com/asiusj">Developer</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Header extends Vue {}
</script>
