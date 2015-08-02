<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/tetris" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=tetris" ;
$project = new project_object("tetris", "Generic block stacking game", "https://github.com/aidansean/tetris", "http://aidansean.com/projects/?tag=tetris", "tetris/images/project.jpg", "tetris/images/project_bw.jpg", "This was my first serious Javascript project which was written some time in 2009.  I chose to write a Tetris clone because it was a well defined project that would teach me how to use Javascript.  In addition to Tetris I also made Tritris and Pentris to see how well balanced the three games are compared to each other.  It turns out that Tetris is about right, with Tritris being too easy and Pentris being too hard.", "Games", "AJAX,CSS,HTML,JavaScript,MySQL,PHP") ;
?>