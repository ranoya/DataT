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
    let arrT = str.match(/\S*/gi);

    let arrTC = [];

    for (let i = 0; i < arrT.length; i++) {
      if (
        arrT[i].indexOf(".") < 0 &&
        arrT[i].indexOf("#") < 0 &&
        arrT[i] != ""
      ) {
        arrTC.push(arrT[i]);
      }
    }

    let arrIDC = str.match(/\#(\S*)/gi);

    let arrCLC = str.match(/\.(\S*)/gi);

    let capTAGS = document.getElementsByTagName("*");

    // Há tags envolvidas
    if (typeof arrTC[0] != "undefined" && arrTC[0] != "") {
      capTAGS = document.getElementsByTagName(arrTC[0]);
    }

    let captTAGSIDS = [];

    // Há ID envolvido
    if (typeof arrIDC != "undefined" && arrIDC != "" && arrIDC != null) {
      for (let t = 0; t < capTAGS.length; t++) {
        if (capTAGS[t].id == arrIDC[0].toString().substring(1)) {
          captTAGSIDS.push(capTAGS[t]);
        }
      }
    } else {
      captTAGSIDS = capTAGS;
    }

    let captTAGSIDSCLASS = [];

    // Há classes envolvidas
    if (typeof arrCLC != "undefined" && arrCLC != "" && arrCLC != null) {
      for (let t = 0; t < captTAGSIDS.length; t++) {
        let valida = [];

        for (let v = 0; v < arrCLC.length; v++) {
          valida[v + " " + arrCLC[v].toString().substring(1)] = false;

          for (let u = 0; u < captTAGSIDS[t].classList.length; u++) {
            if (
              captTAGSIDS[t].classList[u] == arrCLC[v].toString().substring(1)
            ) {
              valida[v + " " + arrCLC[v].toString().substring(1)] = true;
            }
          }
        }

        let validou = true;

        for (let clas in valida) {
          if (!valida[clas]) {
            validou = false;
          }
        }

        if (validou) {
          captTAGSIDSCLASS.push(captTAGSIDS[t]);
        }
      }
    } else {
      captTAGSIDSCLASS = captTAGSIDS;
    }

  if (captTAGSIDSCLASS.length == 1) {
    captTAGSIDSCLASS[0].$ = $;
    captTAGSIDSCLASS[0].$$ = $$;
    return captTAGSIDSCLASS[0];
  } else {

    for (let k = 0; k < captTAGSIDSCLASS.length; k++) {
      captTAGSIDSCLASS[k].$ = $;
      captTAGSIDSCLASS[k].$$ = $$;
    }
    
    return captTAGSIDSCLASS;
    
  }
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
    let arrT = str.match(/\S*/gi);

    let arrTC = [];

    for (let i = 0; i < arrT.length; i++) {
      if (
        arrT[i].indexOf(".") < 0 &&
        arrT[i].indexOf("#") < 0 &&
        arrT[i] != ""
      ) {
        arrTC.push(arrT[i]);
      }
    }

    let arrIDC = str.match(/\#(\S*)/gi);

    let arrCLC = str.match(/\.(\S*)/gi);

    let capTAGS = document.getElementsByTagName("*");

    // Há tags envolvidas
    if (typeof arrTC[0] != "undefined" && arrTC[0] != "") {
      capTAGS = document.getElementsByTagName(arrTC[0]);
    }

    let captTAGSIDS = [];

    // Há ID envolvido
    if (typeof arrIDC != "undefined" && arrIDC != "" && arrIDC != null) {
      for (let t = 0; t < capTAGS.length; t++) {
        if (capTAGS[t].id == arrIDC[0].toString().substring(1)) {
          captTAGSIDS.push(capTAGS[t]);
        }
      }
    } else {
      captTAGSIDS = capTAGS;
    }

    let captTAGSIDSCLASS = [];

    // Há classes envolvidas
    if (typeof arrCLC != "undefined" && arrCLC != "" && arrCLC != null) {
      for (let t = 0; t < captTAGSIDS.length; t++) {
        let valida = [];

        for (let v = 0; v < arrCLC.length; v++) {
          valida[v + " " + arrCLC[v].toString().substring(1)] = false;

          for (let u = 0; u < captTAGSIDS[t].classList.length; u++) {
            if (
              captTAGSIDS[t].classList[u] == arrCLC[v].toString().substring(1)
            ) {
              valida[v + " " + arrCLC[v].toString().substring(1)] = true;
            }
          }
        }

        let validou = true;

        for (let clas in valida) {
          if (!valida[clas]) {
            validou = false;
          }
        }

        if (validou) {
          captTAGSIDSCLASS.push(captTAGSIDS[t]);
        }
      }
    } else {
      captTAGSIDSCLASS = captTAGSIDS;
    }

    for (let k = 0; k < captTAGSIDSCLASS.length; k++) {
      captTAGSIDSCLASS[k].$ = $;
      captTAGSIDSCLASS[k].$$ = $$;
    }

    return captTAGSIDSCLASS;
  };


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
  
  