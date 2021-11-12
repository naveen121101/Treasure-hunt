
function process(){
  var answer=document.getElementById("exampleFormControlInput1").value;
  if(answer==="correct"){
     $('.correct').css('display','block');
    }
     else{
     $('.wrong').css('display','block');
     }
}
function preventBack(){window.history.forward();}
    setTimeout("preventBack()", 0);
    window.onunload=function(){null};
