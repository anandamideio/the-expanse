export const animateUI = (el, animation, content) => {
  const element = document.getElementById(el)
  const handleAnimationEnd = () => {
    element.classList.remove('animated', animation, 'faster');
    element.removeEventListener('animationend', handleAnimationEnd);
  };
  element.innerHTML = `${content}`;
  element.classList.add('animated', animation, 'faster');
  element.addEventListener('animationend', handleAnimationEnd);
}
export default {animateUI};
