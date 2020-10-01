import { Tag } from './pjTag.js';
import { SelectPj } from './pjSelect.js';
//`../src/${gameName}/character_${i}.png`
class Pj {
  constructor(i, gameName) {
    this.name = `character_${i}`;
    this.img = `../src/${gameName}/character_${i}.png`;
    this.found = false;
    this.coordinates = [null, null];
    this.tag = new Tag(i, gameName);
    this.selectImg = new SelectPj(i, gameName);
  }
  setCoordinates(x, y) {
    const canSetPlace = this.tag.canMove();
    if (canSetPlace) {
      this.coordinates = [x, y];
      this.tag.setPlace(x, y);
    }
  }
  canMoveTag() {
    return this.tag.canMove();
  }
  setAsFound() {
    this.found = true;
    this.selectImg.setAsFound();
    this.tag.setAsFound();
  }
  isFound() {
    return this.found;
  }
  notFound() {
    this.tag.setAsNotFound();
  }
  setAsSelected() {
    this.selectImg.setAsSelected();
  }
}

export { Pj };
