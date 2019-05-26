// Time Saving Functions
export function nodeVisToggle(toggleNode, className) {
  if (Array.isArray(toggleNode)) {
    for (let step = 0; step < toggleNode.length; step++) {
      document.getElementById(`${toggleNode[step]}`).classList.toggle(`${className}`);
    }
  } else {
    document.getElementById(`${toggleNode}`).classList.toggle(`${className}`);
  }
}

export function nodeContent(selectedNode, content, animate, animation) {
  const element = document.querySelector(`#${selectedNode}`);
  function handleAnimationEnd() {
    element.classList.remove('animated', animation, 'faster');
    element.removeEventListener('animationend', handleAnimationEnd);
  }
  if (animate === true) {
    document.getElementById(selectedNode).innerHTML = `${content}`;
    element.classList.add('animated', animation, 'faster');
    element.addEventListener('animationend', handleAnimationEnd);
  } else {
    document.getElementById(selectedNode).innerHTML = `${content}`;
  }
}

export function changeNode(selectedNode, newNode, newText) {
  document.getElementById(selectedNode).id = newNode;
  document.getElementById(newNode).value = newText;
}
