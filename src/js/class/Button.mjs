import {nodeContent} from '../modules/gameFunctions.mjs';
import {µ} from '../modules/env.mjs';

/* ==========================================================================
//                                Button Class                             //
===========================================================================*/

export class Button { // These are outside of the constructor to be compliant with private field declarations:
  #id; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations
  #clickFn;
  #val = 0;
  #text;
  #color;
  constructor(id, click, val, text, color) {
    this.#id = id;
    this.#clickFn = click;
    this.#val = val;
    this.#text = text;
    this.#color = color;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get clickFn() { return this.#clickFn; }

  get val() { return this.#val; }

  get text() { return this.#text; }
  set text(value) { this.#text = value; nodeContent(this.#id, this.#text);}

  get color() { return this.#color; }
  set color(value) {
    const oldColor = this.#color;
    this.#color = value;
    µ(`#${this.#id}`).removeClass(oldColor).addClass(this.#color);}
}
export default Button;
