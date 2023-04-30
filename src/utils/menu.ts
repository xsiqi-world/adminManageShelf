export const menuParse = (list) => {
  let map = {};
  const menuList: any[] = [];
  list.forEach(item => {
    if (item.is_menu != 1) {
      return;
    }
    if (item.pid == 0) {
      menuList.push(item);
    }
    
    if (!map[item.pid]) {
      map[item.pid] = [];
    }
    map[item.pid].push(item);
  });

  list.forEach(item => {
    if (!item.children) {
      item.children = [];
    }
    if (map[item.id]) {
      item.children.push(...map[item.id]);
    }
  });
  
  return menuList;
}