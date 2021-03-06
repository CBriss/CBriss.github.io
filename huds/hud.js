class Hud {
    constructor(element) {
      this.element = element;
    }
  
    generateTextBlock() {
      let newElement = document.createElement("p");
      newElement.classList.add('ui-text');
      this.element.appendChild(newElement);
      return newElement;
    }
  
    clear(){
      while (this.element.firstChild) {
        this.element.removeChild(this.element.lastChild);
      }
    }
  }
  