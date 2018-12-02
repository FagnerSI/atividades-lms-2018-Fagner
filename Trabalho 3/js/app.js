
let url_user = "http://rem-rest-api.herokuapp.com/api/usuarios";
let url_teste = "http://rest.learncode.academy/api/lms/user";


function appState(){

  if(localStorage.userLogado){

   let user = JSON.parse(localStorage.userLogado)
   let $btn_entrar =  $("#btn-entrar");

   $btn_entrar.text("Sair"); 
   $btn_entrar.removeClass("dropdown-toggle"); 
   $btn_entrar.attr("title", user.email);


   $("#btn-entrar").click(function(){
     $(this).empty();

     localStorage.removeItem("userLogado");    
     location.reload();

     let documento = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

     if(documento.indexOf("compras.html") != -1){
      window.location.href = window.location.href.replace("compras.html","index.html")
    }
  });

   $("#create-account").addClass("disabled-component");
   $("#car").removeClass("disabled-component"); 
   $(".input-group.disabled-component").removeClass("disabled-component"); 
 }
}

appState()


$("#btn-login").click(function(event){

  let $email = $("#login-email");
  let $password = $("#login-senha");       

  let user = {
    email:$email.val(),
    password:$password.val()
  }  

  if(!login(user)){

    if(!$email[0].checkValidity()){
      alertUser($email[0].validationMessage);     
    }
    else{

      if(!$password[0].checkValidity()){
        alertUser($password[0].validationMessage)
      }
      else{
        event.preventDefault();
        $email.val(""),
        $password.val(""),
        alertUser("Usuário e/ou senha incorreto(s). Tente Novamente!");
      }
    }
  }

});

$("#btn-create").click(function(event){

  let $email = $("#account-email").val();
  let $password = $("#account-senha").val();

  let user = {
    email:$email,
    password:$password
  }

  createAccount(user)                

});

$(".card .input-group button").click(function(event){

 alert("OLa")               

});


function createAccount(user){  
  localStorage.userCreated = JSON.stringify(user);
  localStorage.userLogado = localStorage.userCreated;
}

function login(user){    
 let userString = JSON.stringify(user);   

 if(userString == localStorage.userCreated){
  localStorage.userLogado = userString;
  return true;
}
return false; 
}


function post(url_send, data_send) {       

  $.ajax({
    type:'POST',
    url: url_send,  
    data: data_send,                
    success: function(data){                   
     console.log(data)
   }
 });         
}       


function get(url_get){
  $.ajax({
    type:'GET',
    url: url_get,              
    success: function(data){
      handleData(data); 
    }
  });
}

function handleData(data){
 $.each(data, function(i, item) {
   console.log(data[i].email);
 });
}

function alertUser(mensagem){
  let alertMensagem = "<div class='alert alert-danger role='alert'>"+mensagem+"<div>";
  
  if($("#info").children()){
     $("#info").empty();
  }
  $("#info").append(alertMensagem);
  
}