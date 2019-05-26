export class Modal {
  constructor(modalName, buttonName) {
    this._name = modalName;
    this._elID = modalName + 'Modal';
    this._button = buttonName;
    this._close = 'close';
  }
  // Modal Name
  get name() { return this._name; }
  set name(value) { this._name = value; }
  // Modal ID
  get id() { return this._elID; }
  // Modal Open Button
  get button() { return this._button}
  set button(value) { this._button = value; }
  // Modal Functions
  function() {
    document.getElementById(this._button).onclick = function () { // When the user clicks on the button, open the modal
      document.getElementById(this._elID).style.display = "block";
    };
    document.getElementsByClassName(this._close)[0].onclick = function () { // When the user clicks on <span> (x), close the modal
      document.getElementById(this._elID).style.display = "none";
    };
    window.onclick = function (event) { // When the user clicks anywhere outside of the modal, close it
      if (event.target === modal) {
        document.getElementById(this._elID).style.display = "none";
      }
    };
  }
}
