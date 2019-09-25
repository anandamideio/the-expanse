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
    set(obj) {
      Object.keys(obj).forEach((key) => {
        el.setAttribute(key, obj[key])
      });
      return this;
    },
    child(element, silent){
      if (!silent){
        el.appendChild(element);
      } else {
        el.append(element);
      }
      return this
    },
    text(txt){
      el.textContent = txt.toString();
      return this;
    },
    textChild(string){
      const textEl = document.createTextNode(string.toString());
      el.appendChild(textEl);
      return this
    }
  };
  el = obj.grab(selector);
  return obj;
};
