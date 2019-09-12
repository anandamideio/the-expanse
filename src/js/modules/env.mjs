/* ==========================================================================
//                           Environment Functions                         //
=============================================================================
                              TABLE OF CONTENTS
 =============================================================================
 0. log - An alias for console.log
 1. asyncForEach - Async compatible forEach
 2. pageDone - executes the function in the callback when the DOM is rendered
 ===========================================================================*/

// 00 - An alias for console.log
export const log = console.log;

// 01 - Async compatible forEach
export const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

// 02 - Initiates the callback function when the dom is done rendering
export const pageDone = function(cb){ // Replaces jQuery document ready
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cb();
  } else { document.addEventListener('DOMContentLoaded', cb); }
};

export default {log, asyncForEach, pageDone};

// σ = alt + 741
// µ = alt + 742
