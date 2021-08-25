<template>
	<div
		v-if="count"
		class="scroll-body"
		:style="{ height: itemHeight * pageVieportSize + 'px' }"
		@scroll="onScr"
		ref="scroll-body"
	>
		<div class="scroll" :style="{ height: itemHeight * count + 'px' }">
			<div
				v-for="(item, i) in LibsToShow"
				:key="i"
				class="scroll-item"
				:style="{ height: itemHeight + 'px', top: itemHeight * (position + i) + 'px' }"
			>
				<slot :item="item"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Lib from "@/models/lib";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class VirtualScroll extends Vue {
	@Prop() items!: [];
	@Prop({ default: 100 }) itemHeight!: number;
	@Prop({ default: 10 }) pageVieportSize!: number;
	@Prop({ default: 0 }) fullPageSize!: number;
	@Prop() count!: number;
	@Prop({ default: 0 }) pos!: number;
	position = this.pos;

	get LibsToShow(): Lib[] {
		const start = this.position;
		const end = start + this.pageVieportSize;
		return this.items.slice(start, end);
	}

	onScr(): void {
		const sb = this.$refs["scroll-body"] as HTMLElement;
		const newPos = Math.floor(sb.scrollTop / this.itemHeight);
		if (this.position != newPos) {
			this.position = newPos;
			this.$emit("scrollPosition", this.position);
		}
	}

	scroll(page: number): void {
		const sb = this.$refs["scroll-body"] as HTMLElement;
		sb.scrollTop = (page - 1) * this.fullPageSize * this.itemHeight;
	}
}
</script>

<style lang="scss" scoped>
.scroll-body {
	position: relative;
	overflow-y: scroll;
	.scroll {
		position: absolute;
		width: 100%;
		overflow: hidden;
		.scroll-item {
			position: absolute;
			width: 100%;
			// border-bottom: #666 1px solid;
		}
	}
}
</style>
