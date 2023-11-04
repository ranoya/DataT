/*
   DATAT HTML SUPPORT FUNCTIONS
   Guilherme Ranoya, 2023

*/


/*

    Get Element By Anything
    Return a HTML element or an Array of HTML elements
    in the confluence of one or many properties of the element
    (tag, id or class)

    myelement = $("#myid");
    myelement = $("div #myid");
    myelement = $(".classA .classB");
    myelement = $("p .classA .classB");

*/

const $ = function (str) {
  return document.querySelector(str);
}

/*

    Get Array of Element By Anything
    Return (always) an array of HTML elements (even if it's only one)
    in the confluence of one or many properties of the element
    (tag, id or class)

    myelement = $$("#myid")[0];
    myelement = $$("div #myid")[0];
    myelement = $$(".classA .classB")[4];

    myelement = [];
    myelement = $$("p .classA .classB");

*/

const $$ = function (str) {
  return document.querySelectorAll(str)
}

/*

    Array of URL variables
    Access a URL variable value

    https://www.mysite.com/?xpto=valueA&nda=valueB
    mydata = $_GET['xpto];
    mydata2 = $_GET['nda'];

*/
  
let $_GET = [];
(function(){
  corte = window.location.href.toString().indexOf('?');
  if (corte > 0) {
      argumento = window.location.href.toString().substring(corte + 1);
      argumentos = argumento.split('&');
      for (arg in argumentos){
          let argCorte = argumentos[arg].indexOf('=');
          $_GET[argumentos[arg].substring(0,argCorte)] = argumentos[arg].substring(argCorte + 1);
      }
  } 
})();
  
  