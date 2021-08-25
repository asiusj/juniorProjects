import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App).use(router).use(store).use(vuetify);
app.config.globalProperties.$filters = {
	textLength(v: string, l: number) {
		return v.substr(0, l);
	},
};
app.mount("#app");
