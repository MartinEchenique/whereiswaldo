import { Tag } from './pjTag.js';
import { SelectPj } from './pjSelect.js';
class Pj {
  constructor(name, img) {
    this.name = name;
    this.img = img;
    this.found = false;
    this.coordinates = [null, null];
    this.tag = new Tag(img);
    this.selectImg = new SelectPj(img, name);
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
