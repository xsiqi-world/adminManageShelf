import Pagination from "./Pagination/index";
import Menu from "./Menu/index";

const install = (app, options) => {
  app.use(Pagination);
  app.use(Menu);
}

const TUI = {
  install
}

// 单独引用
export { Pagination, Menu };

// 全局引用
export default TUI;