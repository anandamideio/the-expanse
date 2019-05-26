// User Class
export class User {
  constructor(name) {
    this._name = name;
    this._health = 0;
    this._money = 0;
    this._awareness = 0;
    this._karma = 0;
    this._intelligence = 0;
    this._strength = 0;
    this._location = 'a dirty alley';
  }
// Player Name Functions
  get name() { return this._name; }
  set name(value) { this._name = value; }
// Player Health Functions
  get health() { return this._health; }
  set health(value) { this._health = value; }
  incHealth(clickValue) { this.health += clickValue; }
  subHealth(clickValue) { this.health -= clickValue; }
// Player Money Functions
  get money() { return this._money; }
  set money(value) { this._money = value; }
  incMoney(clickValue) { this.money += clickValue; }
  subMoney(clickValue) { this.money -= clickValue; }
// Player Awareness Functions
  get awareness() { return this._awareness; }
  set awareness(value) { this._awareness = value; }
  incAwareness(clickValue) { this.awareness += clickValue; }
  subAwareness(clickValue) { this.awareness -= clickValue; }
// Player Karma Functions
  get karma() { return this._karma; }
  set karma(value) { this._karma = value; }
  incKarma(clickValue) { this.karma += clickValue; }
  subKarma(clickValue) { this.karma -= clickValue; }
// Player Intelligence Functions
  get intelligence() { return this._intelligence; }
  set intelligence(value) { this._intelligence = value; }
  incIntelligence(clickValue) { this.intelligence += clickValue; }
  subIntelligence(clickValue) { this.intelligence -= clickValue; }
// Player Strength Functions
  get strength() { return this._strength; }
  set strength(value) { this._strength = value; }
  incStrength(clickValue) { this.strength += clickValue; }
  subStrength(clickValue) { this.strength -= clickValue; }
// Player Location Functions
  get location() { return this._location; }
  set location(value) { this._location = value; }
  setLocation(value) { this.location = value; }
}
