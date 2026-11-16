import { createRouter, createWebHistory } from "vue-router";
import RoutePathConstants from "./routePathConstants";

const routes = [
    // トップ
    { path: RoutePathConstants.PAGE_LOGIN, name: "TopPage", component: () => import("./components/main/pages/TopPage.vue") },
    // ログアウト
    { path: RoutePathConstants.PAGE_LOGOUT, name: "Logout", component: () => import("./components/main/pages/Logout.vue") },

    // 仮メニュー
    { path: RoutePathConstants.PAGE_MENU_TEMP, name: "MenuTempBase", component: () => import("./components/main/pages/menu/MenuTempBase.vue") },

];

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
});

export default router;