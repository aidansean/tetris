<?php
$title = 'Block stacking' ;
$js_scripts  = array('settings.js', 'functions.js') ;
$stylesheets = array('style.css') ;
include_once('project.php') ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
<script type="text/ecmascript">
<!--

var n = 4 ;
var nFromGet = parseInt(getParameterByName('n')) ;
switch(nFromGet){
  case 3:
  case 4:
  case 5:
    n = nFromGet ;
    break ;
  default: break ;
}

var nRows = 16 ;
var nCols = 12 ;
var nRowsPreview = 3 ;
var nColsPreview = 4 ;
var pieces = tetrisPieces ;
var gamename = 'tetris' ;
if(n==3){
  nRows = 9 ;
  nCols = 9 ;
  nRowsPreview = 2 ;
  nColsPreview = 3 ;
  
  //nRows = 5 ;
  //nCols = 5 ;
  pieces = tritrisPieces ;
  gamename = 'tritris' ;
}
if(n==5){
  nRows = 18 ;
  nCols = 14 ;
  nRowsPreview = 4 ;
  nColsPreview = 5 ;
  pieces = pentrisPieces ;
  gamename = 'pentris' ;
}

var phpFile = 'score.php' ;
var play_table_id = 'gameTable' ;

var nPieces = pieces.length ;
var R = new Array(n) ;
var C = new Array(n) ;
var rotatedR = new Array(n) ;
var rotatedC = new Array(n) ;
var rows = new Array(n) ;
for(var i=0 ; i<n ; i++){ rows[i] = new Array(2) ; }
var wait  = 500 ;
var delay = wait ;
var drop  = 0 ;
var color = "" ;
var score      =   0 ;
var threshold  = 500 ;
var pause      =   0 ;
var nextPiece  = Math.floor(Math.random()*nPieces)+1 ;
var lines      =   0 ;
var level      =   0 ;
var nSteps     =  10 ;
var step       =   0 ;
var justFallen =   1 ;
var highScore  =  -1 ;
var music      =   0 ;
var xmlhttp ;
var t ;
var X = Math.floor(nCols/2) ;
var Y = 1 ;
-->
</script>

<div class="tab">
  <div class="tab_cell">
    <div id="side">
      <h3>Preview:</h3>
      <div id="previewDiv"></div>
      <h3>Statistics:</h3>
      <table id="scoreStuff">
        <tbody>
          <tr><th class="scores">Score:</th><td class="scores"><span id="score"></span></td></tr>
          <tr><th class="scores">Lines:</th><td class="scores"><span id="lines"></span></td></tr>
          <tr><th class="scores">Level:</th><td class="scores"><span id="level"></span></td></tr>
        </tbody>
      </table>
      <h3>Controls:</h3>
      <p id="controls">Press space to begin.<br />
        &larr; key: Move left<br />
        &rarr; key: Move right<br />
        &uarr; key: Rotate<br />
        &darr; key: Drop<br />
        Space: pause/resume<br /><br />
        m: toggle music<br /><br />
        (You can also use <tt>a</tt>, <tt>d</tt>, <tt>w</tt> and <tt>s</tt>)
      </p>
      
      <h3>Music</h3>
      <p class="center"><a onmousedown='toggleMusic()' style="text-decoration:underline"><span id="music">Play music</span></a></p>
      
      <audio controls loop id="audio">
        <source src="tetris.mp3" type="audio/mpeg">
        <embed height="20px" width="150px" src="tetris.mp3">
      </audio>
    </div>
  </div>
  <div class="tab_cell">
    <div id="playArea"></div>
  </div>
</div>

</div>
<?php foot() ; ?>