function getLoggedInUserName() {
    var currentUser = localStorage.getItem("loggedInUser");
    if(currentUser != undefined)
        return currentUser;
    else
        return "";

}

function saveOrUpdateTopScore(game, score, timeInSeconds){    
    if(score > 0 && timeInSeconds > 0) {
        var currentScoreObj = {
            userName: getLoggedInUserName(),        
            score: score,        
            time: timeInSeconds
        };

        var key = "TOPSCORE_"+ game.toUpperCase(); //ex. TOPSCORE_MAZE    
        var existingTopScoreObj = localStorage.getItem(key);
        if(existingTopScoreObj != undefined){
            var existingTopScoreJsonObj = JSON.parse(existingTopScoreObj);
            if((score >= existingTopScoreJsonObj.score) 
                && (timeInSeconds <= existingTopScoreJsonObj.time)){ 
                //New Top Score
                localStorage.setItem(key, JSON.stringify(currentScoreObj));
            }
        }
        else{ //first time
            localStorage.setItem(key, JSON.stringify(currentScoreObj));
        }
    }
}

function getTopScoreByGame(game){
    var key = "TOPSCORE_"+ game.toUpperCase(); //ex. TOPSCORE_MAZE 
    var existingTopScoreObj = localStorage.getItem(key);
    if(existingTopScoreObj != undefined)
        return JSON.parse(existingTopScoreObj);
    else
        return "";
}

function getTopScoreUserByGame(game){
    var topScoreJsonObj = getTopScoreByGame(game);
    if(topScoreJsonObj != "")
        if(topScoreJsonObj.score > 0 && topScoreJsonObj.time > 0)
            return topScoreJsonObj.userName;
        else
            return "";
    else
      return "";
}
  
function getFormattedTopScoreValueByGame(game){
    var topScoreJsonObj = getTopScoreByGame(game);
    if(topScoreJsonObj != "")
        if(topScoreJsonObj.score > 0 && topScoreJsonObj.time > 0)
            return "Score : " + topScoreJsonObj.score + ", in " + topScoreJsonObj.time + " seconds !!";
        else
            return "";        
    else
        return "";
}

function authenticateUser(emailid, password){
    var registeredUsers = localStorage.getItem("registeredUsers");
    var registeredUsersJson = JSON.parse(registeredUsers);
    for (obj of registeredUsersJson) {
        if((obj.email == emailid) && (obj.password == password))
            return true;
    }
    return false;
}

function getNameByEmailID(emailid){
    var registeredUsers = localStorage.getItem("registeredUsers");
    var registeredUsersJson = JSON.parse(registeredUsers);
    for (obj of registeredUsersJson) {
        if((obj.email == emailid))
            return obj.firstname + " " + obj.lastname;
    }
    return "";
}