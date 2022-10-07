import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
window.Kakao.init("5257e12da6621152b880dc692768d245");
