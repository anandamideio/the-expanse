// User Class
export class User {
  _health = 0;
  _money = 0;
  _awareness = 0;
  _karma = 0;
  _intelligence = 0;
  _strength = 0;
  _creativity = 0;
  _perception = 0;
  _charisma = 0;
  _location = 'a dirty alley';
  _statPoints = 28;
  _perkPoints = 1;
  _perks = [];
  constructor(name) {
    this._name = name;
  }

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get health() { return this._health; }
  set health(value) { this._health = value; }
  incHealth(clickValue) { this._health += clickValue; }
  subHealth(clickValue) { this._health -= clickValue; }

  get money() { return this._money; }
  set money(value) { this._money = value; }
  incMoney(clickValue) { this._money += clickValue; }
  subMoney(clickValue) { this._money -= clickValue; }

  get awareness() { return this._awareness; }
  set awareness(value) { this._awareness = value; }
  incAwareness(clickValue) { this._awareness += clickValue; }
  subAwareness(clickValue) { this._awareness -= clickValue; }

  get karma() { return this._karma; }
  set karma(value) { this._karma = value; }
  incKarma(clickValue) { this._karma += clickValue; }
  subKarma(clickValue) { this._karma -= clickValue; }

  get intelligence() { return this._intelligence; }
  set intelligence(value) { this._intelligence = value; }
  incIntelligence(clickValue) { this._intelligence += clickValue; }
  subIntelligence(clickValue) { this._intelligence -= clickValue; }

  get strength() { return this._strength; }
  set strength(value) { this._strength = value; }
  incStrength(clickValue) { this._strength += clickValue; }
  subStrength(clickValue) { this._strength -= clickValue; }

  get creativity() { return this._creativity; }
  set creativity(value) { this._creativity = value; }
  incCreativity(clickValue) { this._creativity += clickValue; }
  subCreativity(clickValue) { this._creativity -= clickValue; }

  get charisma() { return this._charisma; }
  set charisma(value) { this._charisma = value; }
  incCharisma(clickValue) { this._charisma += clickValue; }
  subCharisma(clickValue) { this._charisma -= clickValue; }

  get perception() { return this._perception; }
  set perception(value) { this._perception = value; }
  incPerception(clickValue) { this._perception += clickValue; }
  subPerception(clickValue) { this._perception -= clickValue; }

  get statPoints() { return this._statPoints; }
  set statPoints(value) { this._statPoints = value; }
  incStatPoints(clickValue) { this._statPoints += clickValue; }
  subStatPoints(clickValue) { this._statPoints -= clickValue; }

  get perkPoints() { return this._perkPoints; }
  set perkPoints(value) { this._perkPoints = value; }
  incPerkPoints(clickValue) { this._perkPoints += clickValue; }
  subPerkPoints(clickValue) { this._perkPoints -= clickValue; }

  get location() { return this._location; }
  set location(value) { this._location = value; }
  setLocation(value) { this._location = value; }

  get perks() { return this._perks; }
  addperk(perk) { this._perks.push(perk); }
}
export default User;
