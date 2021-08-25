<template>
	<div class="input-field hide-overlay">
		<div class="input-field_body">
			<input
				:class="{ filled: value }"
				id="search-input"
				type="text"
				v-model="value"
				@keyup="search"
			/>
			<label class="input-field_label" for="search-input">Поиск</label>
		</div>
		<v-btn icon="mdi-magnify" size="small" style="box-shadow: none" @click="search"></v-btn>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Search extends Vue {
	value = "";
	typing = 0;

	search(): void {
		if (this.typing) {
			clearTimeout(this.typing);
		}
		this.typing = setTimeout(() => {
			this.$store.commit("setFilterSearch", this.value);
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
.input-field {
	font-size: 14px;
	margin: 32px 0 6px;
	display: flex;
	align-items: center;
	.input-field_body {
		position: relative;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 3px;
		input,
		select,
		textarea {
			border: 1px solid #c3c3c3;
			border-radius: 3px;
			outline: none;
			transition: border-color 0.3s;
			line-height: 1.4em;
			padding: 3px 2px 3px 6px;
			font-size: 14px;
			box-sizing: border-box;
			color: transparent;
			margin: 0;
			width: 180px;
			&:focus {
				border-color: #646464;
				color: inherit;
			}
			&:focus
				~ label:not(.group-label):not(.checkbox-label):not(.radio-label):not(.radio-body):not(.checkbox-body),
			&.filled
				~ label:not(.group-label):not(.checkbox-label):not(.radio-label):not(.radio-body):not(.checkbox-body) {
				top: -16px;
			}
			&.filled {
				color: inherit;
			}
		}
		label:not(.group-label):not(.checkbox-label):not(.radio-label):not(.radio-body):not(.checkbox-body) {
			font-size: 12px;
			position: absolute;
			left: 6px;
			top: 9px;
			transition: top 0.6s;
			background: #ffffff;
			z-index: 2;
			border-radius: 70px/18px;
			padding: 4px 0 2px 0;
			margin-top: -5px;
			user-select: none;
			outline: none;
		}
		label.group-label,
		label.checkbox-label,
		label.radio-label {
			font-size: 12px;
			order: -1;
			margin-right: 6px;
			&.group-label:not(.input-group-item-label) {
				width: 100%;
				padding: 0 0 6px;
			}
		}
		label.radio-body {
			width: 17px;
			height: 17px;
			border: 2px solid #666;
			border-radius: 50%;
			padding: 0;
			display: block;
			position: relative;
			cursor: pointer;
		}
		label.radio-body:before {
			content: "";
			display: block;
			position: absolute;
			width: 13px;
			height: 13px;
			background-color: #666;
			overflow: hidden;
			border-radius: 50%;
			left: 2px;
			top: 2px;
			opacity: 0;
			transition: opacity 0.3s;
		}
		label.radio-body:after {
			content: "";
			display: none;
			position: absolute;
			width: 17px;
			height: 17px;
			background-color: rgb(0, 255, 128);
			overflow: hidden;
			border-radius: 50%;
			left: 0px;
			top: 0px;
			z-index: -1;
			opacity: 1;
			animation-duration: 0.3s;
			animation-name: radio-on;
			animation-fill-mode: forwards;
		}
		label.checkbox-body {
			width: 15px;
			height: 15px;
			border: 2px solid #666;
			border-radius: 3px;
			padding: 0;
			display: block;
			position: relative;
			cursor: pointer;
		}
		label.checkbox-body:before {
			content: "\2714";
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			width: 15px;
			height: 15px;
			background-color: #666;
			color: white;
			overflow: hidden;
			left: 0px;
			top: 0px;
			opacity: 0;
			transition: opacity 0.3s;
		}
		label.checkbox-body:after {
			content: "";
			display: none;
			position: absolute;
			width: 15px;
			height: 15px;
			background-color: rgb(0, 255, 128);
			overflow: hidden;
			border-radius: 50%;
			left: 0px;
			top: 0px;
			z-index: -1;
			opacity: 1;
			animation-duration: 0.3s;
			animation-name: radio-on;
			animation-fill-mode: forwards;
		}

		label.required:before {
			content: "*";
			display: block;
			position: absolute;
			top: 0px;
			right: -8px;
		}

		input.input-radio,
		input.input-checkbox {
			width: 0px;
			height: 0px;
			border: none;
			&:checked ~ label.radio-body:before,
			&:checked ~ label.checkbox-body:before {
				opacity: 1;
			}
			&:checked ~ label.radio-body:after,
			&:checked ~ label.checkbox-body:after {
				display: block;
			}
			&.disabled ~ label.radio-body,
			&.disabled ~ label.checkbox-body {
				border-color: #c3c3c3;
			}
		}
		.input-group {
			display: flex;
			align-items: center;
			width: 100%;
			.input-group-item {
				display: flex;
				align-items: center;
				margin-right: 6px;
			}
		}
	}
}
.input-sub-title {
	font-size: 14px;
}
:deep .hide-overlay {
	& button:focus .v-btn__overlay {
		opacity: 0;
	}
}
</style>
