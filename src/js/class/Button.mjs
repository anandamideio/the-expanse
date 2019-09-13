import {ui} from '../modules/ui';
import {µ} from '@abourass/micro'

/* ==========================================================================
//                                Button Class                             //
===========================================================================*/
export const Button = function(id, click, val, text, color) {
  return {
    _id: id,
    id(str){if(!str){return this._id} else {this._id = str; return this;}},
    _clickFn: click,
    clickFn(){return this._clickFn.name;},
    _val: val,
    val(){return this._val;},
    _text: text,
    text(str){ if(!str){return this._text} else {this._text = str; ui(this._id, this._text); return this}},
    _color: color,
    color(str){ if(!str){return this._color} else {const oldColor = this._color; this._color = str; µ(`#${this._id}`).removeClass(oldColor).addClass(this._color);}},
  };
};
export default Button;
