class SelectPj {
  constructor(i, gameName, left = null, top = null) {
    this.setAsSelected = this.setAsSelected.bind(this);
    this.domElement = this.createDomElement(i, gameName);
  }
  setAsSelected() {
    let previusSelected = document.getElementsByClassName('selected')[0];
    if (previusSelected) previusSelected.classList.remove('selected');
    this.domElement.classList.add('selected');
  }

  createDomElement(i, gameName) {
    let container = document.getElementById('faces-container');
    let domElement = document.createElement('img');
    domElement.src = `./themes/${gameName}/character_${i}.png`;
    domElement.classList.add('toFindImg');
    domElement.dataset.index = i;
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
