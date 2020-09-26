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
    if (!this.found) {
      this.coordinates = [x, y];
      this.tag.setPlace(x, y);
    }
  }
  setAsFound() {
    this.found = true;
    this.selectImg.setAsFound();
  }
  isFound() {
    return this.found;
  }
  setAsSelected() {
    this.selectImg.setAsSelected();
  }
}

export { Pj };
