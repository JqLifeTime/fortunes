// 函数节流
export const debounce = (func, delay = 200) => {
  let timer = null;

  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
