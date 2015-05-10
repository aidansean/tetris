<?php

include_once('mysql.php') ;

$mySQL_connection = mysql_connect('localhost', $mysql_username, $mysql_password) or die('Could not connect: ' . mysql_error()) ;
mysql_select_db($mysql_database) or die('Could not select database') ;

$table_name = '' ;
if(isset($_GET['gamename'])){
  if($_GET['gamename']=='tritris') $table_name = $mysql_prefix . 'tritris_scores' ;
  if($_GET['gamename']=='tetris' ) $table_name = $mysql_prefix . 'tetris_scores'  ;
  if($_GET['gamename']=='pentris') $table_name = $mysql_prefix . 'pentris_scores' ;
}

if($_GET['task']=='submitScore'){
  $name  = clean_string_azAZ09hyphen($_GET['playerName'] ) ;
  $score = clean_string_azAZ09hyphen($_GET['score']) ;
  $lines = clean_string_azAZ09hyphen($_GET['lines']) ;
  $level = clean_string_azAZ09hyphen($_GET['level']) ;
  if($name!=''){
    $query = 'INSERT INTO ' . $table_name . ' (name, score, theLevel, theLines) VALUES ("' . $name . '", ' . $score . ', ' . $level . ', ' . $lines . ')' ;
    $result = mysql_query($query) or die(mysql_error() . ' ' . $query) ;
    echo 'Your score has been submitted.' ;
  }
}

if($_GET['task']=='getScore'){
  $theScore = -1 ;
  $query = 'SELECT score FROM ' . $table_name . ' ORDER BY score DESC LIMIT 1 OFFSET 10' ;
  $result = mysql_query($query) or die(mysql_error() . ' ' . $query) ;
  $row = mysql_fetch_assoc($result) ;
  if(empty($row)) $theScore = 0 ;
  $theScore = $row['score'] ;
  echo ($theScore+0) ;
}

if($_GET['task']=='getHighScoresBoard'){
  $theScore = -1 ;
  $query = 'SELECT * FROM ' . $table_name . ' ORDER BY score DESC LIMIT 10' ;
  $result = mysql_query($query) or die(mysql_error() . ' ' . $query) ;
  $string = '<table id="highScoresBoardTable"><tr><th>Name</th><th>Score</th><th>Level</th><th>Lines</th></tr>' . PHP_EOL ;
  while($row = mysql_fetch_assoc($result)){
    $string = $string . '<tr>' 
    . '<td class="scores">' . $row['name']     . '</td>' 
    . '<td class="scores">' . $row['score']    . '</td>' 
    . '<td class="scores">' . $row['theLevel'] . '</td>' 
    . '<td class="scores">' . $row['theLines'] . '</td>' 
    //. '<td class="scores">' . $row['date']     . '</td>' 
    . '</tr>' . PHP_EOL ;
  }
  $string = $string . '</tr></table>' ;
  echo $string ;
}

function clean_string_azAZ09hyphen($string){
  for($i=strlen($string) ; $i>-1 ; $i--){
    if( !preg_match('/[a-zA-Z0-9]/', substr($string, $i, 1) ) AND !preg_match('/-/', substr($string, $i, 1) ) ) $string = substr_replace($string, ' ', $i, 1) ;
  }
  $string = str_replace(' ', '', $string) ;
  return $string ;
}

?>