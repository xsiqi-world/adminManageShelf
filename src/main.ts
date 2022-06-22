import { createApp } from 'vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons-vue';
import { renderLoading } from './utils/render';

import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$title = '后台管理系统';
app.config.globalProperties.$renderLoading = renderLoading;

for (const name in ElIcons) {
	app.component(name, (ElIcons as any)[name]);
}

app.use(router)
.use(ElementPlus)
.mount('#app');
