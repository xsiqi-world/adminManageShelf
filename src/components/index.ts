import { Pagination } from "./Pagination/index";
import { Menu } from "./Menu/index";

const components = {
  Pagination,
  Menu
};

// 单独引用
export {
  Pagination,
  Menu
};

const install = (app, options) => {
  for (let key in components) {
    app.use(components[key]);
  }
  console.log(options);
}

// const TUI = {
//   install
// }

// 全局引用
// export default TUI;
export default {
  install
};