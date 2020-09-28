class Tag {
  constructor(src) {
    this.borderElement = this.createBorderElement();
    this.domElement = this.createDomElement(src);
    this.visible = false;
  }
  setTop(top, visible = true) {
    this.domElement.style.top = `${top - 25}px`;
    this.borderElement.style.top = `${top - 25}px`;
  }
  setLeft(left, visible = true) {
    this.domElement.style.left = `${left - 25}px`;
    this.borderElement.style.left = `${left - 25}px`;
  }
  setPlace(top, left) {
    if (!this.visible) {
      this.visible = true;
      this.domElement.style.display = 'block';
      this.borderElement.style.display = 'block';
    }
    this.borderElement.setAttribute('class', 'tagBorder loader');
    this.setTop(top);
    this.setLeft(left);
  }
  setAsFound() {
    this.borderElement.setAttribute('class', 'tagBorder foundTag');
  }
  setAsNotFound() {
    this.borderElement.setAttribute('class', 'tagBorder noFoundTag');
    setTimeout(() => {
      this.domElement.style.display = 'none';
      this.borderElement.style.display = 'none';
      this.borderElement.setAttribute('class', 'tagBorder');

      this.visible = false;
    }, 800);
  }
  canMove() {
    return (
      !this.borderElement.classList.contains('noFoundTag') &&
      !this.borderElement.classList.contains('foundTag') &&
      !this.borderElement.classList.contains('loader')
    );
  }
  createDomElement(src) {
    let container = document.getElementById('tagged-image');
    let domElement = document.createElement('img');
    domElement.style.position = 'absolute';
    domElement.src = src;
    domElement.style.display = 'none';

    domElement.classList.add('tag-img');
    container.appendChild(domElement);
    return domElement;
  }
  createBorderElement() {
    let container = document.getElementById('tagged-image');
    let borderElement = document.createElement('div');
    borderElement.style.position = 'absolute';
    borderElement.style.display = 'none';
    container.appendChild(borderElement);
    return borderElement;
  }
}

export { Tag };
