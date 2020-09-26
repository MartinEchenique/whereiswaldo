class SelectPj {
  constructor(src, name, left = null, top = null) {
    this.setAsSelected = this.setAsSelected.bind(this);
    this.domElement = this.createDomElement(name, src);
  }
  setAsSelected() {
    let previusSelected = document.getElementsByClassName('selected')[0];
    if (previusSelected) previusSelected.classList.remove('selected');
    this.domElement.classList.add('selected');
  }

  createDomElement(name, src) {
    let container = document.getElementById('faces-container');
    let domElement = document.createElement('img');
    domElement.src = src;
    domElement.classList.add('toFindImg');
    domElement.dataset.name = name;
    domElement.addEventListener('click', this.setAsSelected);
    container.appendChild(domElement);
    return domElement;
  }
  setAsFound() {
    this.domElement.classList.add('found');
    this.domElement.removeEventListener('click', this.setAsSelected);
    this.domElement.classList.remove('selected');
  }
}

export { SelectPj };
