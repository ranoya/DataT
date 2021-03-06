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

getdata = function (arquivojson, callback) {

    fetch(arquivojson).then(response => response.json()).then((dados) => {

        callback(dados);
    });

}


/**
 * Boolean Filter
 * Create a list array from an old one when their elements have any value on a specific criteria(key)
 * 
 * Ex:
 * 
 * separate = bfilter(oldarray, "active");
 * 
 */

/**
 * Unique Function
 * Create a list array from unique values stored in a specific array field
 * 
 * Ex:
 * 
 * categories = unique(oldarray, "taxonomy") {
 * 
 */

unique = function (arr, crit) {
    let newarr = [];

    for (let i = 0; i < arr.length; i++) {
        newarr[arr[i][crit]] = 0;
    }

    let list = [];

    for (let key in newarr) {
        list.push(key);
    }

    return list;
}


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

sortbylist = function (arr, list, crit) {
    let newarr = [];

    for (let l = 0; l < list.length; l++) {
        for (let a = 0; a < arr.length; a++) {
            if (arr[a][crit] == list[l]) {
                newarr.push(arr[a]);
            }
        }
    }

    return newarr;
}


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

tags = function (arr, crit, separator) {
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
}


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

select = function (arr, fun, arr2) {
    let newarr = [];

    for (let i = 0; i < arr.length; i++) {
        fun(newarr, arr[i], arr2);
    }

    return newarr;
}


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

patterncheck = function (n, arr, patt) {

    let mark = false;

    for (let k = 0; k < Object.keys(arr).length; k++) {
        if (patt.test(arr[Object.keys(arr)[k]])) {
            mark = true;
        }
    }

    if (mark) {
        n.push(arr);
    }
}

/**
 * Additive multipattern check
 * Include any finding of any patterns separated by space
 * 
 * Ex:
 * 
 * newarray = select(oldarray, multipatterncheck_add, "slide presentation document");
 * 
 */

multipatterncheck_add = function (n, arr, patt) {

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
}

/**
 * Exclusion multipattern check
 * Include findings when all patterns separated by space are present
 * 
 * Ex:
 * 
 * newarray = select(oldarray, multipatterncheck_exclude, "slide class");
 * 
 */


multipatterncheck_exclude = function (n, arr, patt) {

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
}







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
omnifilterfetchdata = function (arquivojson, el_id) {
    // Fetch JSON file
    fetch(arquivojson).then(response => response.json()).then((omnifdados) => {
        //Start Omnifilter Event Listener Function
        startomnifilter(omnifdados, el_id, omnifilter);
    });
}

// Omnifilter Event Listener Function
startomnifilter = function (omnifdados, elemento, funcprocessa) {
    console.log("Omnifilter: fetch finished");
    console.table(omnifdados);

    /**
     *  Add a Listener Funcion filtering JSON data with
     *  DataT Select and Patterncheck, and running the
     *  update of anything insider Omnifilter Function
     */
    document.getElementById(elemento).addEventListener('input', function (evt) {
        let newomniarray = select(omnifdados, multipatterncheck_exclude, this.value);
        funcprocessa(newomniarray);
    });

    console.log("Omnifilter: filtering event listener started");

    let newomniarray = select(omnifdados, multipatterncheck_exclude, "");
    funcprocessa(newomniarray);
}