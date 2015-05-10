function getParameterByName(name){
  // Taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search) ;
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) ;
}

function start(){
  if(getCookie()==1) return ;
  var table = Create("table") ;
  table.id = play_table_id ;
  Get('playArea').appendChild(table) ;
  for(var i=1 ; i<nRows+1 ; i++){
    var tr = Create("tr") ;
    var rowId = (i<10) ? "tr0"+i : "tr"+i ;
    tr.id = rowId ;
    Get(play_table_id).appendChild(tr) ;
    for(var j=1 ; j<nCols+1 ; j++){
      var td = Create("td") ;
      var cellId = (i<10) ? "td_0"+i : "td_"+i ;
      cellId = (j<10) ? cellId+'_'+"0"+j : cellId+'_'+j ;
      td.id = cellId ;
      Get(rowId).appendChild(td) ;
      if(n==3){
        td.style.width  = '40px' ;
        td.style.height = '40px' ;
      }
      else if(n==4){
        td.style.width  = '30px' ;
        td.style.height = '30px' ;
      }
      else if(n==5){
        td.style.width  = '20px' ;
        td.style.height = '20px' ;
      }
      setBlock(i,j,"empty") ;
    }
  }
  var table = Create("table") ;
  table.id='previewTable' ;
  Get('previewDiv').appendChild(table) ;
  for(var i=1 ; i<nRowsPreview+1 ; i++){
    var tr = Create("tr") ;
    var rowId = (i<10) ? "trPreview0"+i : "tr"+i ;
    tr.id = rowId ;
    Get("previewTable").appendChild(tr) ;
    for(var j=1 ; j<nColsPreview+1 ; j++){
      var td = Create("td") ;
      var cellId = (i<10) ? "tdPreview_0"+i : "tdPreview_"+i ;
      cellId = (j<10) ? cellId+'_'+"0"+j : cellId+'_'+j ;
      td.id = cellId ;
      td.style.width  = '20px' ;
      td.style.height = '20px' ;
      Get(rowId).appendChild(td) ;
      setPreview(i,j,"empty") ;
    }
  }
  xmlhttp = GetXmlHttpObject() ;
  if(xmlhttp!=null){
    var div = Create("div") ;
    div.id = "highScoresBoard" ;
    Get("container").appendChild(div) ;
    xmlhttp.onreadystatechange = updateHighScoresBoard ;
    var url = phpFile+'?task=getHighScoresBoard&gamename='+gamename+'&sid=' + Math.random() ;
    xmlhttp.open("GET", url , true) ;
    xmlhttp.send(null) ;
  }
  addEvent(window.document, 'keydown', keyDown) ;
  newGame() ;
}
function newGame(){
  score = 0 ;
  lines = 0 ;
  level = 1 ;
  wait  = 500 ;
  delay = wait ;
  pause = 1 ;
  setScore() ;
  createNewPiece() ;
  for(var i=1 ; i<nRows+1        ; i++){ for(var j=1 ; j<nCols+1        ; j++){   setBlock(i, j, "empty") ; } }
  for(var i=1 ; i<nRowsPreview+1 ; i++){ for(var j=1 ; j<nColsPreview+1 ; j++){ setPreview(i, j, "empty") ; } }
  for(var i=0 ; i<n ; i++){ setBlock(R[i],C[i],color) ; }
  window.setTimeout("moveActivePiece()", delay) ;
}

function getScore(){
  if(xmlhttp.readyState==4){
    highScore = xmlhttp.responseText ;
    var congratulations = "That's not bad!" ;
    if(score>5000)  congratulations = "That's awesome!" ;
    if(score>50000) congratulations = "Erm, you might want to get out more!" ;
    if(score<100)   congratulations = "That's pathetic!" ;
    if(score>highScore){
      var name = prompt("Game over!  You scored " + score + " points.  " + congratulations + "  Thanks for playing.\n\nYou've earned a place on the High Scores Board!  If you want to appear on the High Scores Boards then enter your name below:") ;
      if(name!=='' && name!=null && name!='null'){
        xmlhttp.onreadystatechange = updateHighScoresBoardAfterSubmit ;
        var url = phpFile+'?task=submitScore' + '&playerName=' + name + '&score=' + score + '&lines=' + lines + '&level=' + level + '&gamename='+gamename+'&sid=' + Math.random() ;
        xmlhttp.open('GET', url, true) ;
        xmlhttp.send(null) ;
      }
    }
    else{
      alert("Game over!  You scored " + score + " points.  " + congratulations + "  Thanks for playing.") ;
    }
    newGame() ;
  }  
}
function updateHighScoresBoard(){
  if(xmlhttp.readyState==4){
    var text = '<h3 id="highScoresBoardH2">High Scores Board</h3>' + xmlhttp.responseText + '<p id="aidan_disclaimer">Players named "Aidan" may have an unfair advantage.</p>' ;
    Get('highScoresBoard').innerHTML = text ;
  }
}
function updateHighScoresBoardAfterSubmit(){
  if(xmlhttp.readyState==4){
    xmlhttp.onreadystatechange = updateHighScoresBoard ;
    xmlhttp.open('GET', phpFile+'?task=getHighScoresBoard&gamename='+gamename+'&sid=' + Math.random(),true) ;
    xmlhttp.send(null) ;
  }
}
function GetXmlHttpObject(){
  if(window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    return new XMLHttpRequest() ;
  }
  if(window.ActiveXObject){
    // code for IE6, IE5
    return new ActiveXObject("Microsoft.XMLHTTP") ;
  }
  return null ;
}
function addEvent(obj, evt, func){
  if (obj.addEventListener){
    obj.addEventListener(evt, func, false) ;
    return true ;
  }
  else if (obj.attachEvent){
    return obj.attachEvent("on" + evt, func) ;
  }
  else{
    obj[evt] = func ;
  }
}
function refreshMusic(){
  if(music==1){
  	Get('audio').play() ;
  }
  else{
    Get('audio').pause() ;
  }
}
function tryDrop() { drop = 1 ; }
function tryMoveLeft(){
  if(canMoveLeft()){
  	for(var i=0 ; i<n ; i++){
      setBlock(R[i],C[i],"empty") ;
      C[i] = C[i]-1 ;
    }
    X = X-1 ;
    for(var i=0 ; i<n ; i++){ setBlock(R[i],C[i],color) ; }
  }
}
function tryMoveRight(){
  if(canMoveRight()){
  	for(var i=0 ; i<n ; i++){
      setBlock(R[i],C[i],"empty") ;
      C[i] = C[i]+1 ;
    }
    X = X+1 ;
    for(var i=0 ; i<n ; i++){ setBlock(R[i],C[i],color) ; }
  }
}
function setScore(){
  Get("score").innerHTML=score ;
  Get("lines").innerHTML=lines ;
  Get("level").innerHTML=level ;
}
function canFall(){
  for(var i=0 ; i<n ; i++) if(R[i]==nRows) return false ;
  for(var i=0 ; i<n ; i++){
    var skip = 0 ;
    for(var j=0 ; j<n ; j++){ if(R[i]>-1 && R[i]+1==R[j] && C[i]==C[j]) skip = 1 ; }
    if(skip==0){
      var className = getClass(R[i]+1,C[i]) ;
      if(className!="empty") return false ;
    }
  }
  return true ;
}
function canMoveLeft(){
  for(var i=0 ; i<n ; i++) if(C[i]==1) return false ;
  for(var i=0 ; i<n ; i++){
    var skip = 0 ;
    for(var j=0 ; j<n ; j++){ if(R[i]==R[j] && C[i]-1==C[j]) skip = 1 ; }
    if(skip==0){
      var className = getClass(R[i],C[i]-1) ;
      if(className!="empty") return false ;
    }
  }
  return true ;
}
function canMoveRight(){
  for(var i=0 ; i<n ; i++) if(C[i]==nCols) return false ;
  for(var i=0 ; i<n ; i++){
    var skip = 0 ;
    for(var j=0 ; j<n ; j++){ if(R[i]==R[j] && C[i]+1==C[j]) skip = 1 ; }
    if(skip==0){
      var className = getClass(R[i],C[i]+1) ;
      if(className!="empty") return false ;
    }
  }
  return true ;
}
function getClass(i,j){
  if(i<1 || i>nRows) return ;
  if(j<1 || j>nCols) return ;
  if(i<10) i = "0"+i ;
  if(j<10) j = "0"+j ;
  return Get("td_"+i+'_'+j).className ;
}
function setBlock(i,j,theClass){
  if(i<1 || i>nRows) return ;
  if(j<1 || j>nCols) return ;
  if(i<10) i = "0"+i ;
  if(j<10) j = "0"+j ;
  var id = "td_"+i+'_'+j ;
  if(Get(id)==null) alert(id + ' ' + i + ' ' + j) ;
  Get(id).className = theClass ;
}
function setPreview(i,j,theClass){
  if(i<1 || i>nRowsPreview) return ;
  if(j<1 || j>nColsPreview) return ;
  if(i<10) i = "0"+i ;
  if(j<10) j = "0"+j ;
  var id = "tdPreview_"+i+'_'+j ;
  if(Get(id)==null) alert(id + ' ' + i + ' ' + j) ;
  Get(id).className = theClass ;
}
function toggleMusic(){
  music = 1-music ;
  refreshMusic() ;
  if(music==1){
    Get('music').innerHTML = 'Pause music' ;
  }
  else{
    Get('music').innerHTML = 'Play music' ;   
  }
}
function sortMultiDimensional(a,b){
  // Taken from http://www.go4expert.com/forums/showthread.php?t=8158
  return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0)) ;
}
function keyDown(e){
  var keyDownID = window.event ? event.keyCode : (e.keyCode != 0 ? e.keyCode : e.which) ;
  switch(keyDownID){
    case 37:
    case 97:
      e.preventDefault() ;
      if(pause==0) tryMoveLeft() ;
      break;
    case 39:
    case 100:
      e.preventDefault() ;
      if(pause==0) tryMoveRight() ;
      break;
    case 38:
    case 119:
      e.preventDefault() ;
      if(pause==0) tryRotate() ;
      break;
    case 40:
    case 115:
      e.preventDefault() ;
      if(pause==0) tryDrop() ;
	  break;
    case 32:
      e.preventDefault() ;
      pause = 1-pause ;
      Get(play_table_id).style.opacity=(1-pause) ;
      break ;
    case 77:
      e.preventDefault() ;
      toggleMusic() ;
      break ;
  }
}

function moveActivePiece(){
  setScore() ;
  if(pause==1){
    t = window.setTimeout("moveActivePiece()", delay) ;
  }
  else if(step<nSteps && drop==0){
    step++ ;
    t = window.setTimeout("moveActivePiece()", delay/nSteps) ;
  }
  else{
    step = 0 ;
    updatePreview() ;
    if(canFall()){
      Y = Y+1 ;
      for(var i=0 ; i<n ; i++){
        setBlock(R[i],C[i],"empty") ;
        R[i] = R[i]+1 ;
      }
      for(var i=0 ; i<n ; i++){ setBlock(R[i],C[i],color) ; }
      if(drop==1) delay = 5 ;
      t = window.setTimeout("moveActivePiece()", 0) ;
    }
    else{
      if(justFallen==1){
        t = window.setTimeout("moveActivePiece()", 0.5*wait) ;
        justFallen = 0 ;
      }
      else{
        // Check for full rows
        for(var i=0 ; i<n ; i++){ rows[i][0] = R[i] ; }
        for(var i=1 ; i<n ; i++){ for(var j=0 ; j<i ; j++){ if(R[j]==R[i]) rows[j][0] = 0 ; } }
        for(var i=0 ; i<n ; i++){
          if(rows[i][0]>0){
            rows[i][1] = 1 ;
            for(var j=1 ; j<nCols+1 ; j++){ if(getClass(rows[i][0],j)=="empty") rows[i][1] = 0 ; }
          }
          else{ rows[i][1] = 0 ; }
        }
        rows.sort(sortMultiDimensional) ;
        var nFullRows = 0 ;
        for(var i=0 ; i<n ; i++){
          if(rows[i][1]==1){
            nFullRows++ ;
            for(var j=rows[i][0] ; j>1 ; j--){
              for(var k=1 ; k<nCols+1 ; k++){ setBlock(j,k,getClass(j-1,k)) ; }
            }
            for(var k=1 ; k<nCols+1 ; k++){ setBlock(1,j,"empty") ; }
          }
        }
        var oldScore = score ;
        score += (nFullRows*(nFullRows+1))*5 ;
        lines += nFullRows ;
        if(Math.floor(score/threshold)-Math.floor(oldScore/threshold)==1){
          wait = 0.9*wait ;
          level++ ;
        }
  
        // Reset the delay between falls
        drop = 0 ;
        delay = wait ;
        // Create new piece
        if(createNewPiece()==false){
          if(xmlhttp==null){
            var congratulations = "That's not bad!" ;
            if(score>5000)  congratulations = "That's awesome!" ;
            if(score>50000) congratulations = "Erm, you might want to get out more!" ;
            if(score<100)   congratulations = "That's pathetic!" ;
            alert("Game over!  You scored " + score + " points.  " + congratulations + "  Thanks for playing.") ;
            newGame() ;
            return ;
          }
          else{
            xmlhttp.onreadystatechange = getScore ;
            xmlhttp.open('GET', phpFile+'?task=getScore&gamename='+gamename+'&sid=' + Math.random(),true) ;
            xmlhttp.send(null) ;
          }
        }
        else{
          t = window.setTimeout("moveActivePiece()", 0) ;
        }
      }
    }
  }
}
function createNewPiece(){
  X = Math.floor(nCols/2) ;
  Y = 1 ;
  justFallen = 1 ;
  var piece = getPiece(nextPiece) ;
  var counter = 0 ;
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      if(piece[i][j]==1){
        R[counter] = i ;
        C[counter] = j ;
        counter++ ;
      }
    }
  }
  color = colors[nextPiece-1] ;
  for(var i=0 ; i<n ; i++){
    R[i] = R[i]+Y-1 ;
    C[i] = C[i]+X-1 ;
  }
  for(var i=0 ; i<n ; i++){ if(R[i]>-1 && getClass(R[i]+1,C[i])!="empty") return false ; }
  nextPiece = Math.floor(Math.random()*nPieces)+1 ;
  return true ;
}

function getPiece(i){ return pieces[i-1] ; }
function setBlockerCookie(){
  var expiryDate=new Date();
  expiryDate.setDate(expiryDate.getDate()+100) ;
  document.cookie = "blockPentris=1;expires=" + expiryDate.toGMTString() ;
  alert('Blocking you...\n\n(Ha ha.  "Block".)') ;
}
function getCookie(){
  var amIBlocked = 0 ;
  if(document.cookie.length>0){
    var cookieStart = document.cookie.indexOf("blockPentris=") ;
    if(cookieStart!=-1){
      cookieStart = cookieStart + 13 ;
      cookieEnd=document.cookie.indexOf(";",cookieStart) ;
      if (cookieEnd==-1) cookieEnd = document.cookie.length ;
      amIBlocked = unescape(document.cookie.substring(cookieStart,cookieEnd)) ;
    }
  }
  if(amIBlocked=='1') alert('You have been blocked!') ;
  return amIBlocked ;
}

function updatePreview(){
  for(var i=1 ; i<nRowsPreview+1 ; i++){ for(var j=1 ; j<nColsPreview+1 ; j++){ setPreview(i, j, "empty") ; } }
  var x = new Array(n) ;
  var y = new Array(n) ;
  var piece = getPiece(nextPiece) ;
  var counter = 0 ;
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      if(piece[i][j]==1){
        x[counter] = i   ;
        y[counter] = j+1 ;
        counter++ ;
      }
    }
  }
  for(var i=0 ; i<n ; i++){setPreview(x[i],y[i],colors[nextPiece-1]);}
}
function tryRotate(){
  rotatePiece() ;
  for(var i=0 ; i<n ; i++){
    if(rotatedR[i]>nRows) return false ;
    if(rotatedR[i]<1)     return false ;
    if(rotatedC[i]>nCols) return false ;
    if(rotatedC[i]<1)     return false ;
    var skip = 0 ;
    for(var j=0 ; j<n ; j++){ if(rotatedR[i]==R[j] && rotatedC[i]==C[j]) skip = 1 ; }
    if(skip==0){
      var className = getClass(rotatedR[i],rotatedC[i]) ;
      if(className!="empty") return false ;
    }
  }
  for(var i=0 ; i<n ; i++){
    setBlock(R[i],C[i], "empty") ;
    R[i] = rotatedR[i] ;
    C[i] = rotatedC[i] ;
  }
  for(var i=0 ; i<n ; i++){ setBlock(R[i],C[i], color) ;}
}
function rotatePiece(){
  for(var i=0 ; i<n ; i++){
    rotatedR[i] =  (Y) + C[i] - (X) ;
    rotatedC[i] =  (X) - R[i] + (Y) ;
  }
}

function Get(id){ return document.getElementById(id) ; }
function Create(type){ return document.createElement(type) ; }
