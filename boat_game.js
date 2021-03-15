class BoatGame {
  constructor(screen_width, screen_height, player_flag, mode, seed_brain=null) {
    
    /* Setup Variables */
    
    // Gameplay
    this.time_left = 1500;
    this.speed_mode = 1;
    this.frame_count = 0;
    this.distance_traveled = 0;
    this.game_speed = 50;
    this.player_flag = player_flag;
    this.mode = mode
    this.hud = this.initializeHud();
    this.input = new Input();

    // Rendering
    this.screen = new GameScreen('game-canvas', screen_width, screen_height);
    this.interval = setInterval(this.update.bind(this), 16);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";   

    // Game Pieces
    this.boat_count = player_flag ? 1 : 50;
    this.genetic_algorithm = new GeneticAlgorithm(this.boat_count, this.mode);
    this.boats = this.genetic_algorithm.firstGeneration(this.screen, seed_brain);
    this.obstacles = [];
  }

  /* Base Functions */

  stop() {
    clearInterval(this.interval);
    this.hud.clear();
    exitGame();
  }

  update() {
    for (let i = 0; i < this.speed_mode; i++) { this.processFrame(); }
    this.drawGameState();
  }


  /* Frame Processing */

  processFrame() {
    this.frame_count += 1;
    this.insertObstacles();
    this.updateObstacles();
    this.updateBoats();
    this.updateGameState();
  }

  insertObstacles() {
    if (this.frame_count % 100 == 0) {
      let gap = Math.random() * this.screen.width() / 3 + this.screen.width()/7;
      this.obstacles.push(...Obstacle.newPairOfObstacles(gap, -10, this.screen.width()));
    }
  }

  removeObstacle(obstacle){
    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
  }

  updateGameState() {
    if ((this.player_flag && this.time_left <= 0) || this.input.isPressed("exit")) this.stop();
    this.time_left = 1500 - this.frame_count;
    this.distance_traveled += Math.ceil(this.game_speed / 10);
    if (this.player_flag)
      this.hud.show(
        this.time_left,
        this.distance_traveled,
        this.boats[0] ? this.boats[0].score : 0
      );
    if (this.boats.length <= 0) {
      if (this.player_flag) this.stop();
      else {
        this.obstacles = [];
        this.boats = this.genetic_algorithm.newGeneration(this.screen);
        this.distance_traveled = 0;
        this.hud.show(
          this.genetic_algorithm.generation_count,
          this.genetic_algorithm.best_individual_score,
          this.genetic_algorithm.best_individual_age);
      }
    }
  }

  updateBoats() {
    for (var i = 0; i < this.boats.length; i++) {
      let boat = this.boats[i];
      let yAxisMovement = (this.mode == 'hard')
      boat.update(
        this.screen,
        this.input,
        this.obstacles,
        this.distance_traveled,
        yAxisMovement
      );

      if (boat.hasCollsionWith(this.obstacles, this.screen.canvas_mid_point) ||
          boat.body.left() == 0 || 
          boat.body.right() == this.screen.width() ||
          boat.body.top() == 0 ||
          boat.body.bottom() == this.screen.height()) {
        this.removeBoat(boat);
      }
    }
  }

  removeBoat(boat){
    let index = this.boats.indexOf(boat);
    this.boats.splice(index, 1)[0];
    this.genetic_algorithm.dead_population.push(boat);
  }

  updateObstacles() {
    // Note: Cannot do a foreach here
    // Since I am splicing the array in the loop
    for (var i = 0; i < this.obstacles.length; i++) {
      let obstacle = this.obstacles[i];
      if(obstacle.update(this.game_speed, this.screen)){
        this.removeObstacle(obstacle);
        i--;
      }
    }
    this.obstacles.sort((a, b) => parseFloat(a.y) - parseFloat(b.y));
  }


  /* Drawing */

  drawGameState() {
    this.screen.clear();
    this.screen.context.drawImage(this.backgroundSprite, 0, 0, this.screen.width(), this.screen.height());
    //this.hud.show(this.screen.context);
    this.drawBoats();
    this.drawObstacles();
  }

  drawBoats() {
    _.forEach(this.boats, boat => { boat.show(this.screen); });
  }

  drawObstacles() {
    _.forEach(this.obstacles, obstacle => { obstacle.show(this.screen); });
  }


  /* Game Input */

  handlePausing() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    else {
      this.interval = setInterval(this.update.bind(this), 16);
    }
  }

  initializeHud(){
    let hud_element = document.getElementById('game-ui');
    return (this.player_flag ? new PlayerHud(hud_element) : new LearningHud(hud_element));
  }
}
