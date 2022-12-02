$(document).ready(() => {
    var retrievedDatalogin = localStorage.getItem('logUsr');
    let splittedString = retrievedDatalogin.split(" ");
    let userLoginEmail = splittedString[splittedString.length - 2];
    let fname;
    for (i = 0; i < localStorage.length; i++) {
        let retrievedDataloginn = JSON.parse(localStorage.getItem('users'));
        for (j = 0; j < retrievedDataloginn.length; j++) {
            if (userLoginEmail == retrievedDataloginn[j][2]) {
                fname = retrievedDataloginn[j][0];
            }
            break;
        }
    }
    console.log(fname);
    $("#loginUser").text(fname);
});
