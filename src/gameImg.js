import { checkForFound } from './checkdb';
import { handleGameOver } from './helperFunctions';

class GameImg {
  constructor(src, id, personages = {}) {
    this.matchId = id;
    this.personages = personages;
    this.img = this.createDomElement(src);
    this.setFirsSelected();
  }
  addPersonage(personage) {
    this.personages = { ...this.personage, personage };
  }
  setFirsSelected() {
    this.personages[
      document.getElementsByClassName('toFindImg')[0].dataset.name
    ].selectImg.setAsSelected();
  }
  createDomElement(src) {
    let container = document.getElementById('tagged-image');
    let domElement = document.createElement('img');
    domElement.src = src;
    domElement.draggable = 'false';
    domElement.setAttribute('id', 'WhereIsWallyImg');
    domElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleImgClick(e);
    });
    container.appendChild(domElement);
    return domElement;
  }
  async handleImgClick(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    if (!document.getElementsByClassName('selected')[0])
      this.personages[
        document.getElementsByClassName('toFindImg')[0].dataset.name
      ].selectImg.setAsSelected();
    let selected = document.getElementsByClassName('selected')[0].dataset.name;
    const personageSelected = this.personages[selected];
    if (personageSelected.canMoveTag()) {
      personageSelected.setCoordinates(y, x);
      this.handleFound(selected, x, y);
    }
  }

  async handleFound(selected, x, y) {
    const personageSelected = this.personages[selected];

    let isFound = await checkForFound(selected, [x, y], this.matchId);
    console.log(isFound.data);
    if (isFound.data) {
      personageSelected.setAsFound();
      this.defineSelect();
      if (this.checkForWin()) {
        handleGameOver(isFound.isTopTen);
      }
    } else {
      personageSelected.notFound();
    }
  }
  defineSelect() {
    for (const personage in this.personages) {
      if (!this.personages.hasOwnProperty(personage)) {
        continue;
      }
      if (!this.personages[personage].isFound()) {
        this.personages[personage].setAsSelected();
        break;
      }
    }
  }
  checkForWin() {
    let win = true;
    for (const key in this.personages) {
      if (this.personages.hasOwnProperty(key)) {
        if (!this.personages[key].isFound()) win = false;
      }
    }
    return win;
  }
}
export { GameImg };
