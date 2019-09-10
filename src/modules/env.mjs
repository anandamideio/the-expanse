// A shorthand for our log
export const log = console.log;

// Async for each
export const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

// Grab whatever element on a page you need (Uses querySelector)
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

// Grab All Selectors on the page (Uses querySelectorAll)
export const µAll = async(selector) => {
  let el;
  const obj = {
    grabAll(){
      if (el) return el;
      return document.querySelectorAll(selector)
    },
    async toggleClass(className) {
      await asyncForEach(async(singleEl) => {
        await singleEl.classList.toggle(className);
      });
      return this;
    },
    async addClass(className) {
      await asyncForEach(async(singleEl) => {
        await singleEl.classList.add(className);
      });
      return this;
    },
    async removeClass(className) {
      await asyncForEach(async(singleEl) => {
        await singleEl.remove(className);
      });
      return this;
    },
    async replaceWith(string) {
      await asyncForEach(async(singleEl) => {
        await singleEl.outerHTML = string;
      });
      return this;
    },
    async html(string) {
      await asyncForEach(async(singleEl) => {
        await singleEl.innerHTML = string;
      });
      return this;
    },
    async remove() {
      await asyncForEach(async(singleEl) => {
        await singleEl.parentNode.removeChild(el);
      });
      return this;
    },
    async text(string) {
     el.forEach((singleEl) => {
       singleEl.textContent = string.toString();
      });
      return this;
    },
  };
  el = obj.grabAll(selector);
  return obj;
};

// Grabs all instances of a selector on page as an array;
export const grabAll = selector => document.querySelectorAll(selector);

// Initiates the callback function when the dom is done rendering
export const pageDone = function(cb){ // Replaces jQuery document ready
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cb();
  } else { document.addEventListener('DOMContentLoaded', cb); }
};

export default {log, µ, asyncForEach, grabAll, pageDone, µAll};

// σ = alt + 741
// µ = alt + 742
