import type { App } from "vue";

// 设置session
export function setSession(key: string, val: string) {
  return sessionStorage.setItem(key, val);
}

// 获取session
export function getSession(key: string): string | null {
  return sessionStorage.getItem(key);
}

// 清除session
export function sessionClear(): void {
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

export const withInstall = <T>(component: T, alias?: string) => {
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
export const throttle = function(fn, delay: number = 500) {
  let timer: any = null;
  return function() {
    if (timer) return;
    timer = setTimeout(() => {
      fn && fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}