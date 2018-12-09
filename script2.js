function signout() {
    window.location.href = "index.html";
    localStorage.removeItem('user');
 }

 function updateNotepad() {
    console.log('changed');
    var content = document.getElementById('notepad').value;
    var loggedInUser=localStorage.getItem('user');
    var accounts=[];
    //get current user data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // alert('ok');
            //alert(this.responseText);
            accounts = JSON.parse(this.responseText);
            //alert(JSON.stringify(accounts[0]));
            // update in database
            accounts[0].notepad=content;
            var json = JSON.stringify(accounts[0]);
            var xhr = new XMLHttpRequest();
            //alert("http://localhost:3000/accounts/" + accounts[0].id);
            xhr.open("PUT", "http://localhost:3000/accounts/" + accounts[0].id, true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.onload = function () {
	            var users = JSON.parse(xhr.responseText);
	            if (xhr.readyState == 4 && xhr.status == "200") {
		            //console.table(users);
	            } else {
		            //console.error(users);
	            }
            };
            xhr.send(json);
       }
    };
    //GET /posts?title=json-server&author=typicode
    xhttp.open("GET", "http://localhost:3000/accounts?user=" + loggedInUser, true);
    xhttp.send();
    //alert(accounts[0]);
 }

 function checkIfUserIsLoggedIn() {
    var user = localStorage.getItem('user');
    if (user == undefined || user==null) {
        window.location.href = "index.html";
        return;
    }
    // if user is logged in, get user notepad
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            document.getElementById('notepad').textContent=account[0].notepad;
       }
    };
    //GET /posts?title=json-server&author=typicode
    xhttp.open("GET", "http://localhost:3000/accounts?user=" + user, true);
    xhttp.send();
 }