import { checkForFound } from './checkdb';
import { handleGameOver } from './helperFunctions';

class GameImg {
  constructor(gameName, id, personages) {
    this.matchId = id;
    this.personages = personages;
    this.img = this.createDomElement(gameName);
    this.gameName = gameName;
    this.personages[0].setAsSelected();
  }
  createDomElement(gameName) {
    let container = document.getElementById('tagged-image');
    let domElement = document.createElement('img');
    domElement.src = `./themes/${gameName}/main.png`;
    domElement.draggable = 'false';
    domElement.setAttribute('id', 'mainImage');
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
    let selected = document.getElementsByClassName('selected')[0].dataset.index;
    const personageSelected = this.personages[selected];
    if (personageSelected.canMoveTag()) {
      personageSelected.setCoordinates(y, x);
      this.handleFound(selected, x, y);
    }
  }

  async handleFound(selected, x, y) {
    const personageSelected = this.personages[selected];
    let isFound = await checkForFound(selected, [x, y], this.matchId);
    if (isFound.data === true) {
      personageSelected.setAsFound();
      const win = this.defineSelect();
      if (win) {
        handleGameOver(isFound.isTopTenTime, this.gameName);
      }
    } else {
      personageSelected.notFound();
    }
  }
  defineSelect() {
    const stillToFound = this.personages.some((personage) => {
      if (!personage.isFound()) {
        personage.setAsSelected();
        return true;
      }
    });
    return !stillToFound;
  }
}
export { GameImg };
