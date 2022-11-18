/*
 * @Author: shaolong
 * @Date: 2022-08-26 11:28:38
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-18 14:30:26
 * @Description:
 */
import { ref } from "vue";

// 防抖hooks
export function useDebounce(cb, delay = 300) {
  const timer = ref(null);

  const handler = function () {
    clearTimeout(timer.value);
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    // eslint-disable-next-line no-invalid-this
    const context = this;
    timer.value = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  };

  const cancel = function () {
    clearTimeout(timer);
    timer.value = null;
  };

  return {
    handler,
    cancel
  };
}

// 节流hooks
export function useThrottle(cb, delay = 500) {
  let prev = Date.now();
  const handler = function () {
    // eslint-disable-next-line no-invalid-this
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      cb.apply(context, args);
      prev = now;
    }
  };

  return {
    handler
  };
}
