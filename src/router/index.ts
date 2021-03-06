import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/details/:id",
		name: "Details",
		component: () => import("@/views/details.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
