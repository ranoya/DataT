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
      return captTAGSIDSCLASS[0];
    } else {
      return captTAGSIDSCLASS;
    }
  };

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

    return captTAGSIDSCLASS;
  };