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
};

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
  return document.querySelectorAll(str);
};

/*

    Array of URL variables
    Access a URL variable value

    https://www.mysite.com/?xpto=valueA&nda=valueB
    mydata = $_GET['xpto];
    mydata2 = $_GET['nda'];

*/

let $_GET = [];
(function () {
  corte = window.location.href.toString().indexOf("?");
  if (corte > 0) {
    argumento = window.location.href.toString().substring(corte + 1);
    argumentos = argumento.split("&");
    for (arg in argumentos) {
      let argCorte = argumentos[arg].indexOf("=");
      $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(
        argCorte + 1
      );
    }
  }
})();

/*

    Swap DOM Elements

    Example:
    domSwap( $("#myid"), $("#myid2") );

*/

let domSwap = function (obj1, obj2) {
  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);
  obj2.parentNode.insertBefore(obj1, obj2);
  temp.parentNode.insertBefore(obj2, temp);
  temp.parentNode.removeChild(temp);
};

/*
   
   Create new DOM Element(s) and return
   a array of created elements or a single element

    domNew( HTML Tag, Properties Array, Element Content, Elements to insert the new elements );
    or
    array = domNew( HTML Tag, Properties Array, Element Content, Elements to insert the new elements );

    Examples:

    manyelements = domNew("div", { id: "myid", class: "myclass" }, "inner HTML", ".multipleexistingelements");
    manyelements[2].innerHTML = "changed inner HTML";

    myelement = domNew("p", {}, "justa a paragraph inside body");
    myelement.innerHTML = "changed the content of the paragraph";

*/

let domNew = function (tag, attrs = {}, inner = "", where) {
  let element = document.createElement(tag);

  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }

  element.innerHTML = inner;

  let matrix = [];

  if (typeof where != "undefined" && where != null && where != "") {
    let places = $$(where);
    for (let i = 0; i < places.length; i++) {
      matrix[i] = places[i].appendChild(element.cloneNode(true));
    }
  } else {
    matrix = document.body.appendChild(element);
  }

  return matrix;
};
