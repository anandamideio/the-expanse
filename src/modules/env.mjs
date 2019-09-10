export const log = console.log;
// Grab whatever element on a page you need (Acts as a replacement for jquery)
export const µ = function(selector) {
  let el;
  const obj = {
    grab() {
      if (el) return el;
      return document.querySelector(selector);
    },
    toggleClass(className) {
      el.classList.toggle(className);
      return this;
    },
    addClass(className) {
      el.classList.add(className);
      return this;
    },
    removeClass(className) {
      el.classList.remove(className);
      return this;
    },
    replaceWith(string) {
      el.outerHTML = string;
      return this;
    },
    html(string) {
      el.innerHTML = string;
      return this;
    },
    remove() {
      el.parentNode.removeChild(el);
      return this;
    },
    text(string) {
      el.textContent = string.toString();
    },
  };
  el = obj.grab(selector);
  return obj;
};
export const grabAll = selector => document.querySelectorAll(selector);
export const pageDone = function(cb){ // Replaces jQuery document ready
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cb();
  } else { document.addEventListener('DOMContentLoaded', cb); }
};

export const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};
export default {log, µ, asyncForEach, grabAll, pageDone};

// σ = alt + 741
// µ = alt + 742
