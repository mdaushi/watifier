import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import "@tabler/core/dist/js/tabler.min.js";
import "@tabler/core/dist/css/tabler.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
