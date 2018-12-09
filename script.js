function checkIfUserIsLoggedInForIndex() {
    var user = localStorage.getItem('user');
    if (user == undefined || user==null) {
        return;
    }
    window.location.href = "notepad.html";
}

 function switchToLogin() {
    document.getElementsByClassName("register-form")[0].style.display="none";
    document.getElementsByClassName("login-form")[0].style.display="inherit";
 }

 function switchToCreate() {
    document.getElementsByClassName("login-form")[0].style.display="none";
    document.getElementsByClassName("register-form")[0].style.display="inherit";
 }

 function login() {
    var user = document.getElementById('usernameL').value;
    var pass = document.getElementById('passwordL').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            if (account==null || account==undefined || account.length < 1) {
                document.getElementById('invalid-login-text').style.display="inherit";
                return;
            }
            if (account[0].pass == pass) {
                localStorage.setItem('user', user);
                window.location.href = "notepad.html";
            } else {
                document.getElementById('invalid-login-text').style.display="inherit";

            }
       }
    };
    //GET /posts?title=json-server&author=typicode
    xhttp.open("GET", "http://localhost:3000/accounts?user=" + user, true);
    xhttp.send();
 }

 function create() {
    var user = document.getElementById('usernameR').value;
    var pass = document.getElementById('passwordR').value;
    //var account = makeAccount(user,pass);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            if (account==null || account==undefined || account.length < 1) {
                // nu exista, il cream
                if (pass.length == 0 || user.length==0) {
                    var t=document.getElementById('already-exists-text');
                    t.innerHTML="Password/user cannot be empty!";
                    t.style.display="inherit";
                    return;
                }
                var newAccount = {};
                newAccount.user=user;
                newAccount.pass=pass;
                newAccount.notepad="your notes here";
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/accounts", true);
                //Send the proper header information along with the request
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() { // Call a function when the state changes.
                    if (this.readyState == 4 && this.status == 201) {
                        // Request finished. Do processing here.
                        localStorage.setItem('user', user);
                        window.location.href = "notepad.html";
                    } else {
                        var t=document.getElementById('already-exists-text');
                        t.innerHTML="Couldn't create account, try again.";
                        t.style.display="inherit";

                    }
                };
                var t = JSON.stringify(newAccount);
                xhr.send(t); 
            } else {
                // exista
                document.getElementById('already-exists-text').style.display="inherit";
                return;
            }
       }
    };
    //GET /posts?title=json-server&author=typicode
    xhttp.open("GET", "http://localhost:3000/accounts?user=" + user, true);
    xhttp.send();
 }


 
