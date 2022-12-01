$(document).ready(() => {

  //* The signup button event handler.
  $("#createAccountButton").click((e) => {
    let isValidFname = false;
    let isValidLname = false;
    let isValidEmail = false;
    let isValidPassword = false;
    let isValidCPassword = false;

    //* validate first name value
    const fname = $("#fname").val();
    if (fname == "") {
      $("#fname").next().text("This field is required");
    } else {
      $("#fname").next().text("");
      isValidFname = true;
    }
    $("#fname").val(fname);

    //* validate last name value
    const lname = $("#lname").val();
    if (lname == "") {
      $("#lname").next().text("This field is required");
    } else {
      $("#lname").next().text("");
      isValidLname = true;
    }
    $("#lname").val(lname);

    //* Validates the email address entered by the user.
    const email = $("#email").val().trim();
    const emailRegEx = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+.([a-z]+)(.[a-z]+)?)$/;
    if (email == "") {
      $("#email").next().text("This field is required");
    } else if (!emailRegEx.test(email)) {
      $("#email").next().text("Must be a valid email address");
    } else {
      $("#email").next().text("");
      isValidEmail = true;
    }
    $("#email").val(email);

    //* Validates the password
    // !TODO: Fix password authentication error. (Some error in lines 43 - 54). maybe incorrect regex.
    //? Error Resolved it was a logical error in line 67.
    const passwd = $("#passwd").val().trim();
    const passwdRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (passwd == "") {
      $("#passwd").next().text("This field is required");
    } else if (!passwdRegEx.test(passwd)) {
      $("#passwd").next().text("Password must be alleast 6 characters including special characters and uppercase letters.");
    } else {
      $("#passwd").next().text("");
      isValidPassword = true;
    }
    $("#passwd").val(passwd);

    //* Validates second password
    const cpasswd = $("#cpasswd").val().trim();
    if (cpasswd == "") {
      $("#cpasswd").next().text("This field is required.");
    } else if (passwd != cpasswd) {
      $("#cpasswd").next().text("Passwords must match");
    } else {
      $("#cpasswd").next().text("");
      isValidCPassword = true;
    }
    $("#cpasswd").val(cpasswd);

    const users = (localStorage.users) ? JSON.parse(localStorage.users) : [];



    if (isValidFname && isValidCPassword && isValidLname && isValidEmail && isValidPassword === true) {
      //* Validating if an account with the same email already exists
      if (localStorage.length == 0) {
        const newUser = [fname, lname, email, passwd];
        users.push(newUser);
        localStorage.users = JSON.stringify(users);
        $("#popup").addClass("open-popup");
      }
      for (i = 0; i < localStorage.length; i++) {
        let retrievedData = JSON.parse(localStorage.getItem('users'));
        for (j = 0; j < retrievedData.length; j++) {
          // console.log(retrievedData[j][2]);
          if (email != retrievedData[j][2]) {
            const newUser = [fname, lname, email, passwd];
            users.push(newUser);
            localStorage.users = JSON.stringify(users);
            $("#popup").addClass("open-popup");
          }
          else {
            $("#email").next().text("An Account with the same email already exists.");
            break;
          }
        }
      }
    }

    //* Preventing default action.
    e.preventDefault();

  });

  $("#popupLogin").click((e) => {
    e.preventDefault();
    loginForm.removeClass("form-hidden");
    createAccountForm.addClass("form-hidden");
    $("#popup").removeClass("open-popup");
  });

  const loginForm = $("#login");
  const createAccountForm = $("#createAccount");


  $("#linkLogin").click((e) => {
    e.preventDefault();
    loginForm.removeClass("form-hidden");
    createAccountForm.addClass("form-hidden");
  });
  $("#linkCreateAccount").click((e) => {
    e.preventDefault();
    loginForm.addClass("form-hidden");
    createAccountForm.removeClass("form-hidden");
  });

  // The Login button event handler.
  $("#loginButton").click((e) => {
    const user = JSON.parse(localStorage.getItem("users")) || "[]";
    for (let users of user) {
      console.log(users);
    }
    console.log(user[0])
  })
});