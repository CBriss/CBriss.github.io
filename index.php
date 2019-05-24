<!DOCTYPE html>
<html>
  <head>
    <!-- Libraries -->
    <script>src="lib/tf.js" type="text/javascript"</script>
    <script>src="lib/helpers.js" type="text/javascript"</script>

    <!-- Main Modules -->
    <script>src="sketch.js" type="text/javascript"</script>
    <script>src="neuroEvolution/neuralNetwork.js" type="text/javascript"</script>
    <script>src="neuroEvolution/geneticAlgorithm.js" type="text/javascript"</script>

    <!-- Game Components -->
    <script>src="gamecomponents/gameArea.js" type="text/javascript"</script>
    <script>src="gamecomponents/shared/gameComponent.js" type="text/javascript"</script>
    <script>src="gamecomponents/boat.js" type="text/javascript"</script>
    <script>src="gamecomponents/person.js" type="text/javascript"</script>
    <script>src="gamecomponents/obstacle.js" type="text/javascript"</script>
    <script>src="gamecomponents/ui/playerHud.js" type="text/javascript"</script>
    <script>src="gamecomponents/ui/learningHud.js" type="text/javascript"</script>
    <meta charset="UTF-8" />
    <title>JS Game</title>
    <style>
      canvas {
        border: 1px solid #d3d3d3;
        background-color: #f1f1f1;
      }
      ul.menu-list {
        list-style: none;
      }
      #menu.main {
        background-image: url("images/menu_bg.jpg");
        height: 300px;
        width: 400px;
      }
      #main h1 {
        color: white;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
          1px 1px 0 #000;
      }
      .button {
        display: block;
        width: 150px;
        line-height: 30px;
        border: 1px solid #aa2666;
        color: white;
        font-weight: bold;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
          1px 1px 0 #000;
        background-color: #fb1886;
        background-image: -webkit-linear-gradient(
          bottom,
          #fb1886 0%,
          #b30d5d 100%
        );
        background-image: linear-gradient(to bottom, #fb1886 0%, #b30d5d 100%);
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
      }
      .button:hover {
        background-color: #b30d5d;
        background-image: -webkit-linear-gradient(
          bottom,
          #b30d5d 0%,
          #fb1886 100%
        );
        background-image: linear-gradient(to bottom, #b30d5d 0%, #fb1886 100%);
      }
    </style>
  </head>
  <body>
    <div id="menu-container" class="wrapper">
      <div id="menu" class="main">
        <div id="main">
          <h1>JS Game</h1>
          <ul class="menu-list">
            <li>
              <a onClick="startGame(true)" class="button play">Player Mode</a>
            </li>
            <li>
              <a onClick="startGame(false)" class="button credits">AI Mode</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>