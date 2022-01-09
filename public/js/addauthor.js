let user = document.getElementById("name");
let error = document.getElementById("error");
let genre = document.getElementById("genre");
let gerror = document.getElementById("gerror");
let img = document.getElementById("img");
let ierror = document.getElementById("ierror");

function search(){
    let nameregexp = /^([a-zA-Z\. ]+)$/
    if(nameregexp.test(user.value)){
      error.innerHTML = "";
      user.style.border = "2px solid green";
      return true;
    }
    else{
      error.innerHTML = "Invalid. The author field should contain only uppercase and lowercase letters.";
      error.style.color = "red";
      user.style.border = "2px solid red";
      return false;
  
    }
}

function validate(){
    let nameregexp = /^([a-zA-Z\, ]+)$/
    if(nameregexp.test(genre.value)){
      gerror.innerHTML = "";
      genre.style.border = "2px solid green";
      return true;
    }
    else{
      gerror.innerHTML = "Invalid. The genre field should contain only comma, uppercase and lowercase letters.";
      gerror.style.color = "red";
      genre.style.border = "2px solid red";
      return false;
  
    }
}
function check(){
    if(img.files.length != 0){
        ierror.innerHTML ="";
        return true;
    }
    else{
        ierror.innerHTML ="Please choose an image";
        ierror.style.color = "red";
        return false;
    }
}
