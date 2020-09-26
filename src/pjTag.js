class Tag {
  constructor(src) {
    this.domElement = this.createDomElement(src);
    this.visible = false;
  }
  setTop(top, visible = true) {
    this.domElement.style.top = `${top - 25}px`;
  }
  setLeft(left, visible = true) {
    this.domElement.style.left = `${left - 25}px`;
  }
  setPlace(top, left) {
    if (!this.visible) {
      this.visible = true;
      this.domElement.style.display = 'block';
    }
    this.setTop(top);
    this.setLeft(left);
  }

  createDomElement(src) {
    let container = document.getElementById('tagged-image');
    let domElement = document.createElement('img');
    domElement.style.position = 'absolute';
    domElement.style.display = 'none';
    domElement.src = src;
    domElement.classList.add('tag-img');
    container.appendChild(domElement);
    return domElement;
  }
}

export { Tag };
