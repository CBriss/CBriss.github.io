class GameScreen{

  constructor(canvas_id, container_id, width, height) {
    // Canvas Rendering
    this.context = GameScreen.newCanvas(canvas_id, container_id, width, height);
    this.canvas = this.context.canvas;
    this.canvas_height = this.canvas.height;
    this.canvas_mid_point = this.canvas_height / 2;
}

  static newCanvas(canvas_id, parent_id, width, height) {
    let canvas = document.createElement("canvas");
    canvas.id = canvas_id;
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext("2d");
    document.getElementById(parent_id).appendChild(canvas);
    return context;
    }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawComponent(sprite, x, y, width, height){
    this.context.drawImage(sprite, x, y, width, height);
  }
  
  drawRectangle(x, y, width, height, color){
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  width() {
    return this.canvas.width;
  }

  height() {
    return this.canvas.height;
  }

  offScreen(component) {
    return (
      component.body.left() <= 0 || 
      component.body.right() >= this.canvas.width ||
      component.body.top() <= 0 ||
      component.body.bottom() >= this.canvas.height
    );
  }
}