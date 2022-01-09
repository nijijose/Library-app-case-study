let email = document.getElementById("mail");
let msg = document.getElementById("error");
let pword = document.getElementById("password");
let epass = document.getElementById("perror");
let repass = document.getElementById("cpwd");
let reenter = document.getElementById("retype");
let fill = document.getElementById("name");
let user = document.getElementById("uname");
let phn = document.getElementById("phno");
let fedbck = document.getElementById("emsg");


function check(){
    let regexp = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)\.([a-z]{2,3})(.[a-z]{2,3})?$/;
    if(regexp.test(email.value)){
        msg.innerHTML = "";
        email.style.border = "2px solid green";
        return true;
    }
    else{
        msg.innerHTML = "Please enter a valid email id.";
        msg.style.color = "red";
        email.style.border = "2px solid red";
        return false;
    }   
}
function validate(){
    var phoneregexp =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phoneregexp.test(phn.value)){
        fedbck.innerHTML = "";
        phn.style.border = "2px solid green";
        return true;
    }
    else{
        fedbck.innerHTML = "Please enter a valid phone number. You can use XXX-XXX-XXXX, XXX.XXX.XXXX, XXX XXX XXXX formats.";
        fedbck.style.color = "red";
        phn.style.border = "2px solid red";
        return false;
    }
}

function checker(){
      var passregexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if(passregexp.test(pword.value)){
          epass.innerHTML = "";
          pword.style.border = "2px solid green";
          return true;
      }
      else{
        epass.innerHTML = "Please enter the password that contain minimum 8 characters, at least one lowercase letter and uppercase letter, and atleast one number";
        epass.style.color = "red";
        pword.style.border = "2px solid red";
        return false;
      }
}
function matcher(){
      if(pword.value==repass.value && pword.value!=""){
           reenter.innerHTML = "Password and confirm password are matching";
           reenter.style.color = "green";
           repass.style.border = "2px solid green";
           return true;
      }
      else{
        reenter.innerHTML = "Invalid Password";
        reenter.style.color = "red";
        repass.style.border = "2px solid red";
        return false;
      }
}
function search(){
  let nameregexp = /^([a-zA-Z\ ]+)$/
  if(nameregexp.test(fill.value)){
    user.innerHTML = "";
    fill.style.border = "2px solid green";
    return true;
  }
  else{
    user.innerHTML = "Please enter the username";
    user.style.color = "red";
    fill.style.border = "2px solid red";
    return false;

  }
}

function show(){
  var x = document.getElementById("password");
  if(x.type === "password"){
    x.type = "text";
  }
  else{
    x.type = "password";
  }
}

var pass = document.getElementById("password");
pass.addEventListener("keyup",function(){
      checkPassword(pass.value)
})
function checkPassword(password){
    var strengthBar = document.getElementById("strength");
    var strength = 0;
    if(password.match(/[a-z]+/)){
      strength +=1;
    }
    if(password.match(/[A-Z]+/)){
      strength +=1;
    }
    if(password.match(/[0-9]+/)){
      strength += 1;
    }
    if(password.length >= 8){
      strength +=1;
    }
    switch(strength){
      case 0:
        strengthBar.value = 0;
        break;
      case 1:
        strengthBar.value = 25;
        break;
      case 2:
        strengthBar.value = 50;
        break;
      case 3:
        strengthBar.value = 75;
        break; 
      case 4:
          strengthBar.value = 100;
          break;   
    }
}
    