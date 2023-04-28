import type { App, Component } from "vue";

// 设置session
export function setSession(key: string, val: any) {
  return sessionStorage.setItem(key, JSON.stringify(val));
}

// 获取session
export function getSession(key: string): any {
  const val = sessionStorage.getItem(key);
  return JSON.parse(val || '0');
}

// 清除session
export function clearSession(): void {
  return sessionStorage.clear();
}


function position() {
  return document.documentElement.scrollTop;
}

function move(amount) {
  document.documentElement.scrollTop = amount;
  // document.body.parentNode.scrollTop = amount;
  // document.body.scrollTop = amount;
}

// export function scrollTo(to, duration, callback) {
//   const start = position();
//   const change = to - start;
//   const increment = 20;
//   let currentTime = 0;
//   duration = (typeof (duration) === 'undefined') ? 500 : duration
//   const animateScroll = function() {
//     // increment the time
//     currentTime += increment;
//     // find the value with the quadratic in-out easing function
//     const val = Math.easeInOutQuad(currentTime, start, change, duration);
//     // move the document.body
//     move(val);
//     // do the animation unless its over
//     if (currentTime < duration) {
//       requestAnimFrame(animateScroll);
//     } else {
//       if (callback && typeof (callback) === 'function') {
//         // the animation is done so lets callback
//         callback();
//       }
//     }
//   }
//   animateScroll();
// }

// 加载组件
export const withInstall = <T = Component>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = function(app: App) {
    app.component(comp.name, comp);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  }

  return comp as T;
}


// 节流函数
export const throttle = function(fn: Function, delay: number = 500) {
  let timer: any = null;
  return function() {
    if (timer) return;
    timer = setTimeout(() => {
      fn && fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}

// 函数深拷贝
export const copyObj = (obj = {}) => {
  // 变量先置空
  let newObj: any = null;  

  // 判断是否需要继续进行递归
  if (typeof (obj) == 'object' && obj !== null) {
    newObj = obj instanceof Array ? [] : {};
    // 进行下一层递归克隆
    for (var i in obj) {
      newObj[i] = copyObj(obj[i]);
    }
    // 如果不是对象直接赋值
  } else newObj = obj;
  
  return newObj;
}

// 拼接url参数
export const joinURLParam = data => {
  let paramsStr = '';
  const addURLParam = (str, name, value) => {
    str += (str.indexOf('?') == -1 ? '?' : '&');
    str += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return str;
  };
  for (let index in data) {
    paramsStr = addURLParam(paramsStr, index, data[index]);
  }
  return paramsStr;
};