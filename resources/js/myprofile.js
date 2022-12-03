$(document).ready(() => {
    var retrievedDatalogin = localStorage.getItem('logUsr');
    let splittedString = retrievedDatalogin.split(" ");
    let userLoginEmail = splittedString[splittedString.length - 2];
    let fname;
    let lname;
    let email;
    let retrievedDataloginn = JSON.parse(localStorage.getItem('users'));
    for (j = 0; j < retrievedDataloginn.length; j++) {
        if (userLoginEmail == retrievedDataloginn[j][2]) {
            fname = retrievedDataloginn[j][0];
            lname = retrievedDataloginn[j][1];
            email = retrievedDataloginn[j][2];
        }
    }
    document.getElementById("fname").placeholder = fname;
    document.getElementById("lname").placeholder = lname;
    document.getElementById("email").placeholder = email;
    $("#loginUser").text(fname);
    $("#updateProfile").click((e) => {
        let isValidStreetNumber = false;
        let isValidStreetName = false;
        let isValidCity = false;
        let isValidProvince = false;
        let isValidPostalCode = false;
        const streetNumber = $("#streetNo").val();
        if (isNaN(streetNumber)) {
            $("#streetNo").next().text("Only Numbers are permitted for this field");
        } else if (streetNumber == "") {
            $("#streetNo").next().text("This field is required.");
        } else {
            isValidStreetNumber = true;
        }
        const streetName = $("#streetName").val();
        if (streetName == "") {
            $("#streetName").next().text("This field is required.");
        }
        else {
            isValidStreetName = true;
        }
        const city = $("#city").val();
        if (city == "") {
            $("#city").next().text("This field is required.");
        }
        else {
            isValidCity = true;
        }
        const province = $("#province").val();
        if (province == "") {
            $("#province").next().text("This field is required.");
        }
        else {
            isValidProvince = true;
        }
        const postal = $("#postal").val();
        if (postal == "") {
            $("#postal").next().text("This field is required.");
        } else if (postal.length != 5 || postal == NaN) {
            $("#postal").next().text("Use 99999 format");
        }
        else {
            isValidPostalCode = true;
        }
        const addressStorage = (localStorage.addressStorage) ? JSON.parse(localStorage.addressStorage) : [];

        if (isValidCity && isValidPostalCode && isValidProvince && isValidStreetName && isValidStreetNumber == true) {
            const address = [email, streetNumber, streetName, city, province, postal];
            addressStorage.push(address);
            localStorage.addressStorage = JSON.stringify(addressStorage);
            alert("Updation Successful");


        }
        e.preventDefault();

    })
    var retrievedDataAddress = localStorage.getItem('addressStorage');
    let splittedAddressString = retrievedDataAddress.split(",");
    document.getElementById("streetNo").placeholder = splittedAddressString[1].slice(1, splittedAddressString[1].length - 1);
    document.getElementById("streetName").placeholder = splittedAddressString[2].slice(1, splittedAddressString[2].length - 1);
    document.getElementById("city").placeholder = splittedAddressString[3].slice(1, splittedAddressString[3].length - 1);
    // document.getElementById("province").next().text(splittedAddressString[4].slice(1, splittedAddressString[4].length - 1));
    $("#province").next().text(splittedAddressString[4].slice(1, splittedAddressString[4].length - 1));
    document.getElementById("postal").placeholder = splittedAddressString[5].slice(1, splittedAddressString[5].length - 3);
});