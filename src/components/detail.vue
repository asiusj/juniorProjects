<template>
	<v-container v-if="Item">
		<v-row>
			<v-col cols="12" xl="3" order="2" order-xl="1">
				<v-img :src="Item.image.url" class="item-image" :alt="Item.image.title" />
			</v-col>
			<v-col cols="12" xl="9" order="1" order-xl="2">{{ Item.name }}</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				{{ Item.description }}
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="6">
				<div>Адрес:</div>
				<div>{{ Item.address }}</div>
			</v-col>
			<v-col
				cols="6"
				v-if="Item.contacts.email || Item.contacts.phones.length || Item.contacts.website"
			>
				<div>Контакты:</div>
				<div v-if="Item.contacts.email">email: {{ Item.contacts.email }}</div>
				<div v-if="Item.contacts.website">
					Сайт: <a :href="Item.contacts.website">{{ Item.contacts.website }}</a>
				</div>
				<div v-if="Item.contacts.phones.length">
					{{ Item.contacts.phones.length > 1 ? "Номера телефонов" : "Номер телефона" }}
				</div>
				<div v-for="phone in Item.contacts.phones" :key="phone">
					<div>{{ phone.value }}</div>
					<div v-if="phone.comment">Комментарий: {{ phone.comment }}</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Lib from "@/models/lib";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class Detail extends Vue {
	@Prop() itemId!: number;

	get Item(): Lib | undefined {
		return this.$store.state.libs.find((lib) => {
			return lib.id === this.itemId;
		});
	}

	mounted() {
		console.log(this.Item);
	}
}
</script>
