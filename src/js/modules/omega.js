export const Ω = function(element, idForNewElement, appendTo) {
  const newEl = document.createElement(element);
  newEl.id = idForNewElement;
  document.getElementById(appendTo).append(newEl);
};
export default Ω;
