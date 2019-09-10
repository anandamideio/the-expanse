/* ==========================================================================
//                           Environment Functions                         //
=============================================================================
                              TABLE OF CONTENTS
 =============================================================================
 0. log - An alias for console.log
 1. asyncForEach - Async compatible forEach
 2. µ - Grab whatever element on a page you need (Uses querySelector)
 3. µAll - Grab All Selectors on the page (Uses querySelectorAll)
 4. grabAll - A simplified version of µAll
 5. pageDone - executes the function in the callback when the DOM is rendered
 ===========================================================================*/

// 00 - An alias for console.log
export const log = console.log;

// 01 - Async compatible forEach
export const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

// 02 - Grab whatever element on a page you need (Uses querySelector)
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
      if (!string) {
        return el.innerHTML;
      } else {
        el.innerHTML = string;
        return this;
      }
    },
    context(){
      return el.outerHTML;
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

// 03 - Grab All Selectors on the page (Uses querySelectorAll)
export const µAll = async(selector) => {
  let el;
  const obj = {
    grabAll(){
      if (el) return el;
      return document.querySelectorAll(selector)
    },
    toggleClass(className) {
      el.forEach((singleEl) => { singleEl.classList.toggle(className); });
      return this;
    },
    addClass(className) {
      el.forEach((singleEl) => { singleEl.classList.add(className); });
      return this;
    },
    removeClass(className) {
      el.forEach((singleEl) => { singleEl.classList.remove(className); });
      return this;
    },
    replaceWith(string) {
      el.forEach((singleEl) => { singleEl.outerHTML = string; });
      return this;
    },
    html(string) {
      el.forEach((singleEl) => { singleEl.innerHTML = string; });
      return this;
    },
    remove() {
      el.forEach((singleEl) => { singleEl.parentNode.removeChild(el);});
      return this;
    },
    text(string) {
     el.forEach((singleEl) => { singleEl.textContent = string.toString(); });
      return this;
    },
  };
  el = obj.grabAll(selector);
  return obj;
};

// 04 - Grabs all instances of a selector on page as an array;
export const grabAll = selector => document.querySelectorAll(selector);

// 05 - Initiates the callback function when the dom is done rendering
export const pageDone = function(cb){ // Replaces jQuery document ready
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cb();
  } else { document.addEventListener('DOMContentLoaded', cb); }
};

export default {log, asyncForEach, µ, µAll, grabAll, pageDone, };

// σ = alt + 741
// µ = alt + 742
