$(document).ready(()=>{

  // The signup button event handler.
  $("#createAccountButton").click((e)=>{
    let isValid = true;

    // validate first name value
    const fname = $("#fname").val();
    if(fname==""){
      $("#fname").next().text("This field is required");
      isValid=false;
    }else {
      $("#fname").next().text("");
    }
    $("#fname").val(fname);

    // validate last name value
    const lname = $("#lname").val();
    if(lname==""){
      $("#lname").next().text("This field is required");
      isValid=false;
    }else {
      $("#lname").next().text("");
    }
    $("#lname").val(lname);

    // Validates the email address entered by the user.
    const email = $("#email").val().trim();
    const emailRegEx = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+.([a-z]+)(.[a-z]+)?)$/;
    if(email==""){
      $("#email").next().text("This field is required");
      isValid = false;
    } else if(!emailRegEx.test(email)) {
      $("#email").next().text("Must be a valid email address");
      isValid = false;
    } else {
      $("#email").next().text("");
    }
    $("#email").val(email);
    
    // Validates the password
    // !TODO: Fix password authentication error. (Some error in lines 43 - 54). maybe incorrect regex.
    const passwd = $("#passwd").val().trim();
    const passwdRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(passwd==""){
      $("#passwd").next().text("This field is required");
      isValid = false;
    } else if(!passwdRegEx.test(passwd)) {
      $("#passwd").next().text("Password must be alleast 6 characters including special characters and uppercase letters.");
      isValid = false;
    } else {
      $("#passwd").next().text("");
    }
    $("#passwd").val(passwd);

    // Validates second password
    const cpasswd = $("#cpasswd").val().trim();
    if(cpasswd == ""){
      $("#cpasswd").next().text("This field is required.");
    }else if(passwd != cpasswd){
      $("#cpasswd").next().text("Passwords must match");
    }else {
      $("#cpasswd").next().text("");
    }
    $("#cpasswd").val(cpasswd);

    const users = (localStorage.users) ? JSON.parse(localStorage.users) : [];

    if(fname && lname && email && passwd != "" && passwd === cpasswd){
    const newUser = [fname,lname,email,passwd];
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
    $("#popup").addClass("open-popup");
  } 

    // Preventing default action.
      e.preventDefault();

  });

  $("#popupLogin").click((e)=>{
    e.preventDefault();
    loginForm.removeClass("form-hidden");
    createAccountForm.addClass("form-hidden");
    $("#popup").removeClass("open-popup");
  });

  const loginForm = $("#login");
  const createAccountForm = $("#createAccount");


  $("#linkLogin").click((e)=>{
    e.preventDefault();
    loginForm.removeClass("form-hidden");
    createAccountForm.addClass("form-hidden");
  });
  $("#linkCreateAccount").click((e)=>{
    e.preventDefault();
    loginForm.addClass("form-hidden");
    createAccountForm.removeClass("form-hidden");
  });

  // The Login button event handler.
  $("#loginButton").click((e)=>{
    const user = JSON.parse(localStorage.getItem("users"))||"[]";
    for(let users of user){
      console.log(users);
    }
    console.log(user[0])
  })
});