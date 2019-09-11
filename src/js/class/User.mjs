/* ==========================================================================
//                                 User Class                              //
============================================================================*/

export class User { // These are outside of the constructor to be compliant with private field declarations:
  #health = 0; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations
  #name;
  #money = 0;
  #awareness = 0;
  #karma = 0;
  #intelligence = 0;
  #strength = 0;
  #creativity = 0;
  #perception = 0;
  #charisma = 0;
  #location = 'a dirty alley';
  #statPoints = 28;
  #perkPoints = 1;
  #perks = [];
  constructor(name) {
    this.#name = name;
  }

  get name() { return this.#name; }
  set name(value) { this.#name = value; }

  get health() { return this.#health; }
  set health(value) { this.#health = value; }
  incHealth(clickValue) { this.#health += clickValue; }
  subHealth(clickValue) { this.#health -= clickValue; }

  get money() { return this.#money; }
  set money(value) { this.#money = value; }
  incMoney(clickValue) { this.#money += clickValue; }
  subMoney(clickValue) { this.#money -= clickValue; }

  get awareness() { return this.#awareness; }
  set awareness(value) { this.#awareness = value; }
  incAwareness(clickValue) { this.#awareness += clickValue; }
  subAwareness(clickValue) { this.#awareness -= clickValue; }

  get karma() { return this.#karma; }
  set karma(value) { this.#karma = value; }
  incKarma(clickValue) { this.#karma += clickValue; }
  subKarma(clickValue) { this.#karma -= clickValue; }

  get intelligence() { return this.#intelligence; }
  set intelligence(value) { this.#intelligence = value; }
  incIntelligence(clickValue) { this.#intelligence += clickValue; }
  subIntelligence(clickValue) { this.#intelligence -= clickValue; }

  get strength() { return this.#strength; }
  set strength(value) { this.#strength = value; }
  incStrength(clickValue) { this.#strength += clickValue; }
  subStrength(clickValue) { this.#strength -= clickValue; }

  get creativity() { return this.#creativity; }
  set creativity(value) { this.#creativity = value; }
  incCreativity(clickValue) { this.#creativity += clickValue; }
  subCreativity(clickValue) { this.#creativity -= clickValue; }

  get charisma() { return this.#charisma; }
  set charisma(value) { this.#charisma = value; }
  incCharisma(clickValue) { this.#charisma += clickValue; }
  subCharisma(clickValue) { this.#charisma -= clickValue; }

  get perception() { return this.#perception; }
  set perception(value) { this.#perception = value; }
  incPerception(clickValue) { this.#perception += clickValue; }
  subPerception(clickValue) { this.#perception -= clickValue; }

  get statPoints() { return this.#statPoints; }
  set statPoints(value) { this.#statPoints = value; }
  incStatPoints(clickValue) { this.#statPoints += clickValue; }
  subStatPoints(clickValue) { this.#statPoints -= clickValue; }

  get perkPoints() { return this.#perkPoints; }
  set perkPoints(value) { this.#perkPoints = value; }
  incPerkPoints(clickValue) { this.#perkPoints += clickValue; }
  subPerkPoints(clickValue) { this.#perkPoints -= clickValue; }

  get location() { return this.#location; }
  set location(value) { this.#location = value; }
  setLocation(value) { this.#location = value; }

  get perks() { return this.#perks; }
  addperk(perk) { this.#perks.push(perk); }
}
export default User;
