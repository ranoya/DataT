/**
 * DataT: small tools for data operations
 * Guilherme Ranoya, 2021
 *
 * BASIC FUNCTIONS
 *
 */

/**
 * Get Data Function
 *
 * Fetch JSON data and call a function to action over
 * the new data
 *
 * Ex:
 *
 * function xpto(d) {
 *    console.table(d);
 * }
 *
 * getdata(myurl,xpto);
 *
 */

const getdata = function (arquivojson, callback) {
  fetch(arquivojson)
    .then((response) => response.json())
    .then((dados) => {
      callback(dados);
    });
};

/**
 * Get CSV Data Function
 *
 * Fetch CSV data and call a function to action over
 * the new data
 *
 * Ex:
 *
 * function xpto(d) {
 *    console.table(d);
 * }
 *
 * getcsvdata(myurl,xpto);
 *
 */

const getcsvdata = function (csvurl, callback) {
  fetch(csvurl)
    .then((response) => response.text())
    .then((dados) => {
      let total = dados.length;
      let changecsv = "";
      let quantquotes = 0;
      for (let r = 0; r < total; r++) {
        if (dados.substring(r, r + 1) == '"') {
          quantquotes++;
        }

        if (dados.substring(r, r + 1) == "\n" && quantquotes % 2 != 0) {
          changecsv = dados.substring(0, r) + " " + dados.substring(r + 1);
          dados = changecsv;
        }
      }

      let linhas = dados.split(/\r?\n|\r|\n/g);
      let linhadados = "";
      let valorfinal = "";
      let temp1 = "";
      let temp2 = "";

      let heads = linhas[0].split(",");

      let arr = [];

      for (let i = 1; i < linhas.length; i++) {
        arr[i - 1] = {};
        linhadados = linhas[i].split(
          /[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/
        );

        for (let k = 0; k < linhadados.length; k++) {
          linhadados[k].trim();

          if (linhadados[k].substring(0, 1) == '"') {
            temp1 = linhadados[k].substring(1, linhadados[k].length);
          } else {
            temp1 = linhadados[k];
          }

          if (temp1.substring(temp1.length - 2, temp1.length) == '"') {
            temp1 = temp1.substring(0, temp1.length - 2);
          }

          if (temp1.substring(temp1.length - 1, temp1.length) == '"') {
            temp2 = temp1.substring(0, temp1.length - 1);
          } else {
            temp2 = temp1;
          }

          valorfinal = temp2.replace(/""/g, '"');

          arr[i - 1][heads[k]] = valorfinal;
        }
      }

      callback(arr);
    });
};

/**
 * shortcut
 */

const gsdata = function (url, funccallback) {
  getcsvdata(GoogleSheetCsvURL(url), function (dados) {
    funccallback(dados);
  });
};

/**
 * Varible don't exist, is undefined or empty
 * Variable exists and has data
 *  *
 * empty: Return true if variable has not data or do not exists, and false otherwise
 * notempty: Return true if a variable exists and has data, and false otherwise
 *
 * Ex:
 *
 * if(empty(mydata)) {
 *
 *   // do something
 *
 * } else {
 *
 *   // do something else
 *
 * }
 *
 */

const empty = function (myvar) {
  if (typeof myvar == "undefined" || myvar == "" || myvar == null) {
    return true;
  } else {
    return false;
  }
};

const notempty = function (myvar) {
  if (typeof myvar != "undefined" && myvar != "" && myvar != null) {
    return true;
  } else {
    return false;
  }
};

/**
 * Get images from any kind of url
 * (under improvement)
 *
 * Return the url for an image.
 * If it is already an imagem, return the url;
 * If it is a video, return the url from the thumnail.
 *
 * Ex:
 *
 * let photo = imagefromallsources('https://www.youtube.com/watch?v=ZbFATmGhz9k');
 *
 */

const imagefromallsources = function (kurl) {
  // FUNÇÃO IMAGE FROM ALL SOURCES

  let saida = kurl;
  let murl = kurl;

  if (kurl.match(/(\&$)/gm)) {
    murl = kurl.replace(/(\&$)/gm, "");
  }

  if (murl.match(/https:\/\/drive\.google\.com\/open\?(.*)/i)) {
    let complementa = murl.match(
      /https:\/\/drive\.google\.com\/open\?id=(.*)/i
    )[1];

    /* OLD
    saida =
      "https://drive.google.com/uc?export=view&" +
      complementa +
      "&usp=drive_fs";
    */

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  if (murl.match(/https:\/\/drive\.google\.com\/file\/d/i)) {
    let complementa = murl.match(
      /https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i
    )[1];

    /* OLD
    saida =
      "https://drive.google.com/uc?export=view&id=" +
      complementa +
      "&usp=drive_fs";
    */

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  if (murl.match(/https:\/\/drive\.google\.com\/uc\?export=view/i)) {
    let complementa = murl.match(/id=(.*)/i)[1];

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  let nurl = murl.replace(/\&amp;/gi, "&");

  let video = nurl.match(
    /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );

  if (typeof video != "undefined" && video != null) {
    saida = "https://img.youtube.com/vi/" + video[6] + "/0.jpg";
  }

  if (nurl.match(/\.png|\.svg|\.jpg|\.gif|.webp/i)) {
    saida = nurl;
  }

  return saida;
};

/**
 *
 * Create tables with images
 *
 * Example:
 * let allimages = datatable(arr, "images_url", { columns: 6, proportion: "4/3"});
 *
 */

imagetable = function (data, column, options) {
  let code = "";

  let colnum = 4;
  let imgsize = "cover";
  let aspect = "1/1";
  let start = 0;
  let stop = data.length;

  if (typeof options != "undefined" && options != null && options != "") {
    if (
      typeof options.columns != "undefined" &&
      options.columns != null &&
      options.columns != ""
    ) {
      colnum = options.columns;
    }

    if (
      typeof options.type != "undefined" &&
      options.type != null &&
      options.type != ""
    ) {
      imgsize = options.type;
    }

    if (
      typeof options.proportion != "undefined" &&
      options.proportion != null &&
      options.proportion != ""
    ) {
      aspect = options.proportion;
    }

    if (
      typeof options.index != "undefined" &&
      options.index != null &&
      options.index != ""
    ) {
      start = options.index;
    }

    if (start > data.length) {
      start = data.length;
    }

    if (
      typeof options.size != "undefined" &&
      options.size != null &&
      options.size != ""
    ) {
      stop = start + options.size;
    }

    if (stop >= data.length) {
      stop = data.length;
    }
  }

  let grd = "";
  for (let k = 0; k < colnum; k++) {
    grd += " 1fr";
  }

  code += `
   <style>
          .datat_elemtyp05 {
             display: grid;
             gap: 16px 16px;
             width: 100%;
          }

          .datat_elemtyp05 div {
             background-position: top center;
          }

          .datat_elemtyp05 div:hover {
             cursor: pointer;
          }

          @media screen and (max-width: 720px) {
             .datat_elemtyp05 {
                  grid-template-columns: 1fr !important;
            }
          }
   </style>

   <div class="datat_elemtyp05 datat_imagetable" style='grid-template-columns:${grd};'>`;

  for (let i = start; i < stop; i++) {
    code += `<div class="datat_imagetable_images" onclick='window.open("${imagefromallsources(
      data[i][column]
    )}")' style='background-repeat: no-repeat; background-size: ${imgsize}; aspect-ratio: ${aspect}; background-image: url("${imagefromallsources(
      data[i][column]
    )}");'></div>`;
  }

  code += `</div>`;

  return html`${code}`;
};

/**
 *
 * Get a JSON from a Google Sheet using opensheet.elk.sh
 *
 * Example:
 * let mydata = googlesheet('https://docs.google.com/spreadsheets/d/1qXCwwsiNdZnqlvNzLxol-ZGRTEH7fQfRsK2SWpNIuM4/edit#gid=1417963869', 'Biblioteca');
 *
 *
 */

const googlesheet = function (url, aba) {
  let arquivo = url.match(/spreadsheets\/d\/(.*)\/edit/i);
  return `https://opensheet.elk.sh/${arquivo[1]}/${aba}`;
};

/**
 * Get a CSV from Google Sheet
 *
 *
 * Return a CSV URL from the provided Google Sheet URL
 *
 * Ex:
 *
 * let mycsvdataurl = GoogleSheetCsvURL('https://docs.google.com/spreadsheets/d/1ih4V4CumuIl5ZynobsazNzGiaPrE2V2Dpt13FI22XNU/edit#gid=0')
 * let data = getcsvdata(mycsvdataurl);
 *
 */

const GoogleSheetCsvURL = function (url) {
  url = new URL(url);
  const id = url.pathname.split("/")[3];
  const gid = new URLSearchParams(url.hash.slice(1)).get("gid") || 0;
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
};

/**
 * Re-scale
 * Create a function that recalculates a value in
 * a different scale
 *
 * Ex:
 *
 * const y = rescale([0,1],[50,70]);
 * let xpto = y(0.5); // = 60
 *
 */

const rescale = function ([a, b], [c, d]) {
  return function (e) {
    return ((e - a) / (b - a)) * (d - c) + c;
  };
};

/**
 * Between Filter
 * Create a list array from an old one when the values in
 * the specified column are between the the limits of the query
 *
 * Ex:
 *
 * let best = btwfilter(oldarray, "ranking", "9.5 >");
 * let eighties = btwfilter(oldarray, "year", "1980 > 1989");
 * let older = btwfilter(oldarray, "year", "> 1970");
 *
 */

const btwfilter = function (arr, col, fi) {
  let di = -1 * Number.MAX_VALUE;
  let df = Number.MAX_VALUE;

  let opera = "";

  if (
    fi.match(
      /\-{0,1}\d{1,20}\.{0,1}\d{0,20}.{0,2}\>.{0,2}\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi
    )
  ) {
    opera = fi.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi);
    di = opera[0];
    df = opera[1];
  } else if (fi.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}.{0,2}\>/gi)) {
    opera = fi.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi);
    di = opera[0];
  } else if (fi.match(/\>.{0,2}\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi)) {
    opera = fi.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi);
    df = opera[0];
  }

  let newarr = [];
  let c = 0;

  for (let i = 0; i < arr.length; i++) {
    if (
      parseFloat(arr[i][col]) >= parseFloat(di) &&
      parseFloat(arr[i][col]) <= parseFloat(df)
    ) {
      newarr[c] = arr[i];
      c++;
    }
  }

  return newarr;
};

/**
 * Boolean Filter
 * Create a list array from an old one when their elements have any value on a specific criteria(key)
 *
 * Ex:
 *
 * separate = bfilter(oldarray, "active");
 *
 */

const bfilter = function (arr, crit) {
  let newarr = [];
  let c = 0;
  for (let k = 0; k < arr.length; k++) {
    if (arr[k][crit] != "" && arr[k][crit] != undefined) {
      newarr[c] = {};
      newarr[c] = arr[k];
      c++;
    }
  }
  return newarr;
};

/**
 * Filter Condition
 * Create a list array from an old one when their elements have a specific value match on a specific criteria(key)
 *
 * Ex:
 *
 * separate = cfilter(oldarray, "status", "(.*)ok");
 *
 */

const cfilter = function (arr, crit, regex) {
  let newarr = [];

  let patt = new RegExp(regex, "i");

  let c = 0;
  for (let k = 0; k < arr.length; k++) {
    if (
      arr[k][crit] != "" &&
      arr[k][crit] != undefined &&
      patt.test(arr[k][crit])
    ) {
      newarr[c] = {};
      newarr[c] = arr[k];
      c++;
    }
  }
  return newarr;
};

/**
 * Sum Two Arrays
 * Create a new array adding the contents of other two arrays
 * sumarrayc fills the gaps with empty values (""), while sumarray leave them null
 *
 * Ex:
 *
 * total = sumarray(array_A,array_B);
 * total_consolidated = sumarrayc(array_A,array_B);
 *
 */

const sumarray = function (arr1, arr2) {
  let arr3 = [];
  let c = 0;

  for (let i = 0; i < arr1.length; i++) {
    arr3[c] = arr1[i];
    c++;
  }

  for (let k = 0; k < arr2.length; k++) {
    arr3[c] = arr2[k];
    c++;
  }

  return arr3;
};

const sumarrayc = function (arr1, arr2) {
  let arr3 = [];
  let c = 0;

  for (let i = 0; i < arr1.length; i++) {
    arr3[c] = arr1[i];
    c++;
  }

  for (let k = 0; k < arr2.length; k++) {
    arr3[c] = arr2[k];
    c++;
  }

  let kes = [];

  for (let i = 0; i < arr3.length; i++) {
    for (let k in arr3[i]) {
      kes[k] = true;
    }
  }

  let ks = [];
  let ck = 0;

  for (let n in kes) {
    ks[ck] = n;
    ck++;
  }

  let arr4 = [];

  for (let n = 0; n < arr3.length; n++) {
    arr4[n] = {};
    for (let s = 0; s < ks.length; s++) {
      if (
        typeof arr3[n][ks[s]] == `undefined` ||
        arr3[n][ks[s]] == null ||
        arr3[n][ks[s]] == ""
      ) {
        arr4[n][ks[s]] = "";
      } else {
        arr4[n][ks[s]] = arr3[n][ks[s]];
      }
    }
  }

  return arr4;
};

/**
 * Array Subtract
 * Subtract the data present in one array if it exists in another array
 *
 * Ex:
 *
 * notconfirmedyet = aSubtract(allnames, confirmednames);
 *
 */

const aSubtract = function (arr1, arr2) {
  var array = [];
  var c = 0;

  for (let i1 = 0; i1 < arr1.length; i1++) {
    let temp = false;

    for (let i2 = 0; i2 < arr2.length; i2++) {
      if (arr1[i1] == arr2[i2]) {
        temp = true;
      }
    }

    if (temp == false) {
      array[c] = arr1[i1];
      c++;
    }
  }

  return array;
};

/**
 * Unique Function
 * Create a list array from unique values stored in a specific array field
 *
 * Ex:
 *
 * categories = unique(oldarray, "taxonomy") {
 *
 */

const unique = function (arr, crit) {
  let newarr = [];

  for (let i = 0; i < arr.length; i++) {
    newarr[arr[i][crit]] = 0;
  }

  let list = [];

  for (let key in newarr) {
    list.push(key);
  }

  return list;
};

/**
 * Sort by a list of values
 * Sort an array using a list of possible values for a specific key
 *
 * Ex:
 *
 * newarray = sortbylist(oldarray, keyvaluesarray, key);
 *
 * Use:
 *
 * disordered = [
 *               {'fruit': 'orange', 'quantity': 5, 'type': 'B'},
 *               {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
 *               {'fruit': 'banana', 'quantity': 3, 'type': 'B'},
 *               {'fruit': 'apple', 'quantity': 10, 'type':'B'},
 *               {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'}
 *              ];
 *
 * list = ['strawberry', 'apple'];
 *
 * orders = sortbylist(disordered, list, 'fruit'); // Array(3):
 *                                                 // [
 *                                                 //  {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'},
 *                                                 //  {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
 *                                                 //  {'fruit': 'apple', 'quantity': 10, 'type':'B'}
 *                                                 // ]
 *
 */

const sortbylist = function (arr, list, crit) {
  let newarr = [];

  for (let l = 0; l < list.length; l++) {
    for (let a = 0; a < arr.length; a++) {
      if (arr[a][crit] == list[l]) {
        newarr.push(arr[a]);
      }
    }
  }

  return newarr;
};

/**
 * Sort by alphabetic order
 * Sort an array in alphabetic order over the values for a specific key
 *
 * Ex:
 *
 * newarray = alphabetic(oldarray, key);
 *
 * Use:
 *
 * students = alphabetic(list, 'name');
 *
 */

const alphabetic = function (arr, crit) {
  let listuniques = unique(arr, crit);
  listuniques.sort();

  let newarr = sortbylist(arr, listuniques, crit);

  return newarr;
};

/**
 * Extract all Tags
 * Extract all Tags(words marking some criteria) in an array of objects,
 * in a specific key of the object
 *
 * Ex:
 *
 * newarray = tags(array, key, separator);
 *
 * Use:
 *
 * alltags = tags(myarray, "categories", ",");
 *
 */

const tags = function (arr, crit, separator) {
  let narr = [];
  let expl = [];

  for (let p = 0; p < arr.length; p++) {
    expl = [];
    expl = arr[p][crit].split(separator);

    for (let z = 0; z < expl.length; z++) {
      narr.push(expl[z]);
    }
  }

  let newarr = [];

  for (let i = 0; i < narr.length; i++) {
    newarr[narr[i]] = 0;
  }

  let list = [];

  for (let key in newarr) {
    list.push(key);
  }

  return list;
};

/**
 * Shuffle Function
 * Create a list of numbers without repetition, for
 * random ordering itens of a list
 *
 * Ex:
 * neworderarray = shuffle(maxvalue, listsize);
 *
 * Use:
 *
 * order = suffle(myarray.length, 10);
 *
 */

const shuffle = function (maxvalue, listsize) {
  let lista = [];
  let c = 0;
  let r = false;
  let n = 0;

  while (c < listsize) {
    n = parseInt(Math.random() * maxvalue);

    r = false;
    for (let i = 0; i < lista.length; i++) {
      if (n == lista[i]) {
        r = true;
      }
    }

    if (!r) {
      lista[lista.length] = n;
      c++;
    }
  }

  return lista;
};

/**
 * Select Function
 * Select data from an Array using a function and a data colection
 * (if specified)
 *
 *
 * Ex:
 *
 * newarray = select(oldarray, function (n, arr, patt) {
 *
 *  if(patt.test(arr.valr)) {
 *
 *    n.push(arr);
 *
 *  }
 *
 * }, /mypattern/i);
 *
 */

const select = function (arr, fun, arr2) {
  let newarr = [];

  for (let i = 0; i < arr.length; i++) {
    fun(newarr, arr[i], arr2);
  }

  return newarr;
};

/**
 * SELECT TOOLS
 *
 */

/**
 * Simple Pattern Check
 *
 * Ex:
 *
 * newarray = select(oldarray, patterncheck, /mypattern/i);
 *
 */

const patterncheck = function (n, arr, patt) {
  let mark = false;

  for (let k = 0; k < Object.keys(arr).length; k++) {
    if (patt.test(arr[Object.keys(arr)[k]])) {
      mark = true;
    }
  }

  if (mark) {
    n.push(arr);
  }
};

/**
 * shortcut
 */

const selectp = function (oldarray, patt) {
  return select(oldarray, patterncheck, patt);
};

/**
 * Additive multipattern check
 * Include any finding of any patterns separated by space
 *
 * Ex:
 *
 * newarray = select(oldarray, multipatterncheck_add, "slide presentation document");
 *
 */

const multipatterncheck_add = function (n, arr, patt) {
  if (patt != "" || typeof patt != "undefined") {
    let mark = false;
    let multipatt = patt.split(" ");
    let regextrans = "";

    for (let m = 0; m < multipatt.length; m++) {
      for (let k = 0; k < Object.keys(arr).length; k++) {
        regextrans = new RegExp(multipatt[m], "i");
        if (regextrans.test(arr[Object.keys(arr)[k]])) {
          mark = true;
        }
      }
    }

    if (mark) {
      n.push(arr);
    }
  } else {
    n.push(arr);
  }
};

/**
 * shortcut
 */

const selecta = function (oldarray, str) {
  return select(oldarray, multipatterncheck_add, str);
};

/**
 * Exclusion multipattern check
 * Include findings when all patterns separated by space are present
 *
 * Ex:
 *
 * newarray = select(oldarray, multipatterncheck_exclude, "slide class");
 *
 */

const multipatterncheck_exclude = function (n, arr, patt) {
  if (patt != "" || typeof patt != "undefined") {
    let multipatt = patt.split(" ");
    let regextrans = "";
    let allcheck = [];
    let mark = true;

    for (let i = 0; i < multipatt.length; i++) {
      allcheck[multipatt[i]] = false;
    }

    for (let k = 0; k < Object.keys(arr).length; k++) {
      for (let m = 0; m < multipatt.length; m++) {
        regextrans = new RegExp(multipatt[m], "i");
        if (regextrans.test(arr[Object.keys(arr)[k]])) {
          allcheck[multipatt[m]] = true;
        }
      }
    }

    for (let i = 0; i < multipatt.length; i++) {
      if (allcheck[multipatt[i]] == false) {
        mark = false;
      }
    }

    if (mark) {
      n.push(arr);
    }
  } else {
    n.push(arr);
  }
};

/**
 * shortcut
 */

const selecte = function (oldarray, str) {
  return select(oldarray, multipatterncheck_exclude, str);
};

/**
 *  OMNIFILTER
 *
 *  I 'm used to work with Observable (https://www.observablehq.com), and
 *  it 's Inputs.search function is a killer solution for filtering data.
 *
 *  This is an implementation of something like Observable 's Inputs.search
 *
 *  You will need:
 *
 *  a <input> element in your HTML;
 *  to create an omnifilter(arr) function, which will update
 *  everything in your document with data filtered by what
 *  is in the <input> element;
 *  a JSON file in an URL.
 *
 *  arr is the array created/updated from the JSON file being
 *  filtered by <input>
 *
 *  Ex:
 *
 *  omnifilter = function (arr) {
 *    console.table(arr);
 *  }
 *
 *  omnifilterfetchdata("https://www.myurl/file.json", "inputelementID");
 *
 */

let omnifdados = [];
let omnifilterfetchdata = function (arquivojson, el_id) {
  // Fetch JSON file
  fetch(arquivojson)
    .then((response) => response.json())
    .then((omnifdados) => {
      //Start Omnifilter Event Listener Function
      startomnifilter(omnifdados, el_id, omnifilter);
    });
};

let omnifilterfetchcsvdata = function (csvurl, el_id) {
  // Fetch CSV file
  fetch(csvurl)
    .then((response) => response.text())
    .then((dados) => {
      let total = dados.length;
      let changecsv = "";
      let quantquotes = 0;
      for (let r = 0; r < total; r++) {
        if (dados.substring(r, r + 1) == '"') {
          quantquotes++;
        }

        if (dados.substring(r, r + 1) == "\n" && quantquotes % 2 != 0) {
          changecsv = dados.substring(0, r) + " " + dados.substring(r + 1);
          dados = changecsv;
        }
      }

      let linhas = dados.split(/\r?\n|\r|\n/g);
      let linhadados = "";
      let valorfinal = "";
      let temp1 = "";
      let temp2 = "";

      let heads = linhas[0].split(",");

      let arr = [];

      for (let i = 1; i < linhas.length; i++) {
        arr[i - 1] = {};
        linhadados = linhas[i].split(
          /[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/
        );

        for (let k = 0; k < linhadados.length; k++) {
          linhadados[k].trim();

          if (linhadados[k].substring(0, 1) == '"') {
            temp1 = linhadados[k].substring(1, linhadados[k].length);
          } else {
            temp1 = linhadados[k];
          }

          if (temp1.substring(temp1.length - 2, temp1.length) == '"') {
            temp1 = temp1.substring(0, temp1.length - 2);
          }

          if (temp1.substring(temp1.length - 1, temp1.length) == '"') {
            temp2 = temp1.substring(0, temp1.length - 1);
          } else {
            temp2 = temp1;
          }

          valorfinal = temp2.replace(/""/g, '"');

          arr[i - 1][heads[k]] = valorfinal;
        }
      }

      startomnifilter(arr, el_id, omnifilter);
    });
};

// Omnifilter Event Listener Function
let startomnifilter = function (omnifdados, elemento, funcprocessa) {
  console.log("Omnifilter: fetch finished");
  console.table(omnifdados);

  /**
   *  Add a Listener Funcion filtering JSON data with
   *  DataT Select and Patterncheck, and running the
   *  update of anything insider Omnifilter Function
   */
  document.getElementById(elemento).addEventListener("input", function (evt) {
    let newomniarray = select(
      omnifdados,
      multipatterncheck_exclude,
      this.value
    );
    funcprocessa(newomniarray);
  });

  console.log("Omnifilter: filtering event listener started");

  let newomniarray = select(omnifdados, multipatterncheck_exclude, "");
  funcprocessa(newomniarray);
};
