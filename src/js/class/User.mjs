import {ui} from '../modules/ui.mjs';

/* ==========================================================================
//                                 User Class                              //
===========================================================================*/
export const User = function(name) {
  return {
    "_name": name,
    "_health": 0,
    "_money": 0,
    "_awareness": 0,
    "_karma": 0,
    "_intelligence": 0,
    "_strength": 0,
    "_creativity": 0,
    "_location": 'a dirty alley',
    "_charisma": 0,
    "_perception": 0,
    "_statPoints": 28,
    "_perkPoints": 0,
    "_perks": [],

    name(str) { if (!str){ return this._name; } else { this._name = str; return this; }},

    health(num) { if(!num){ return this._health;} else { this._health = num; return this; }},
    incHealth(clickValue) { this._health += clickValue; ui('healthUI', this._health, true, 'bounce'); },
    subHealth(clickValue) { this._health -= clickValue; ui('healthUI', this._health, true, 'bounce'); },

    money(num){ if(!num){return this._money;} else {this._money = num; return this}},
    incMoney(clickValue) { this._money += clickValue; ui('moneyUI', this._money, true, 'bounce'); },
    subMoney(clickValue) { this._money -= clickValue; ui('moneyUI', this._money, true, 'bounce'); },

    awareness(num) { if(!num){return this._awareness;} else {this._awareness = num; return this;}},
    incAwareness(clickValue) { this._awareness += clickValue; ui('awarenessUI', this._awareness, true, 'bounce');},
    subAwareness(clickValue) { this._awareness -= clickValue; ui('awarenessUI', this._awareness, true, 'bounce');},

    karma(num) { if(!num){return this._karma;} else {this._karma = num; return this}},
    incKarma(clickValue) { this._karma += clickValue; ui('karmaUI', this._karma, true, 'bounce');},
    subKarma(clickValue) { this._karma -= clickValue; ui('karmaUI', this._karma, true, 'bounce');},

    intelligence(num) {if(!num){return this._intelligence;} else {this._intelligence = num; return this}},
    incIntelligence(clickValue) { this._intelligence += clickValue; },
    subIntelligence(clickValue) { this._intelligence -= clickValue; },

    strength(num) {if(!num){return this._strength;} else {this._strength = num; return this;}},
    incStrength(clickValue) { this._strength += clickValue; },
    subStrength(clickValue) { this._strength -= clickValue; },

    creativity(num) {if(!num){return this._creativity;} else {this._creativity = num; return this;}},
    incCreativity(clickValue) { this._creativity += clickValue;},
    subCreativity(clickValue) { this._creativity -= clickValue;},

    location(str) {if(!str){return this._location;} else {this._location = str; return this;}},

    charisma(num) {if(!num){return this._charisma;} else {this._charisma = num; return this;}},
    incCharisma(clickValue) { this._charisma += clickValue;},
    subCharisma(clickValue) { this._charisma -= clickValue;},

    perception(num) {if(!num){return this._perception;} else {this._perception = num; return this;}},
    incPerception(clickValue) { this._perception += clickValue;},
    subPerception(clickValue) { this._perception -= clickValue;},

    statPoints(num) {if(!num){return this._statPoints;} else { this._statPoints = num; return this;}},
    incStatPoints(clickValue) { this._statPoints += clickValue;},
    subStatPoints(clickValue) { this._statPoints -= clickValue;},

    perkPoints(num) {if(!num){return this._perkPoints;} else {this._perkPoints = num; return this;}},
    incPerkPoints(clickValue) { this._perkPoints += clickValue;},
    subPerkPoints(clickValue) { this._perkPoints -= clickValue;},

    perks() { return this._perks; },
    addPerk(perk) { this._perks.push(perk); return this; },

    load(characterObj){
      Object.keys(characterObj.value).forEach((key) => {if (this.hasOwnProperty(key)){this[key] = characterObj.value[key]}});
      const value = this; // Dont inline this, it keeps the value container for the player class obj
      return {value};
    }
  }
};
export default User;
