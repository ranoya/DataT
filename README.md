# DataT

Guilherme Ranoya, 2021

<br><br>

## What's it?

Small functions to help dealing with data in javascript. Tools for manipulating data in arrays of objects.

## How to use them?

Load the library direcly from the web:

```html
<script src="https://datat.vercel.app/basicsmin.js"></script>
```

Or download the file from [github](https://github.com/ranoya/DataT/blob/main/basicsmin.js).

The reference and examples are also commented in the [source code](https://datat.vercel.app/basics.js).

<br>

The Observable version of Datat (the same library for use inside Observable) can be imported from [here](https://observablehq.com/@ranoya/datat)  

<br><br>

<br>
<br>
<br>

## General Functions

<br>

---

<br>

### Fetch CSV function
Get a csv from a URL
```js
getcsvdata(myurl, function(data) {
   // console.table(data);
});
```
<br>
Example:
```js
let doSomething = function(data) {
  console.table(data);
}

getcsvdata("https://www.mysite.com/mydata.csv", doSomething);
```
<br>

*Shortcuts*<br>
`gsdata(mygooglesheeturl, doSomething)` to get data from a Google Sheet<br>

<br>

---

<br>

### Get a CSV URL from your Google Sheet
Return a valid CSV URL from the provided Google Sheet URL

*important*: the google sheet must be *public for everyone with the link* for reading.

<br>

```js
xpto = GoogleSheetCsvURL(mygooglesheeturl);
```
<br>
Example:
```js
let mycsvdataurl = GoogleSheetCsvURL('https://docs.google.com/spreadsheets/d/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/edit#gid=0');
getcsvdata(mycsvdataurl, doSomething);
```

<br>

*Shortcuts*<br>
`gsdata(mygooglesheeturl, doSomething)` to get data from a Google Sheet<br>

<br>

---

<br>

### Fetch JSON function

Get a json from a URL
```js
getdata(myurl, function(data) {
   // console.table(data);
});
```
<br>
Example:
```js
let doSomething = function(data) {
  console.table(data);
}

getdata("https://www.mysite.com/mydata.json", doSomething);
```

<br>

---

<br>

### Get a JSON output from a Google Sheet URL using opensheet.elk.sh
Return the correct URL for a JSON output from Google Sheets

*important*: the google sheet must be *public for everyone with the link* for reading. Otherwise it won't be accessible to opensheet.elk.sh

*important 2*: unfortunatelly not recommended anymore, because some internet providers block de address or fail to load the data from opensheet.elk.sh; use getcsvdata instead.

<br>

```js
xpto = googlesheet(mygooglesheeturl,sheetname);
```
<br>
Example:
```js
let myJsonURL = googlesheet('https://docs.google.com/spreadsheets/d/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/edit#gid=0', 'CodeEditors');

let doSomething = function(data) {
  console.table(data);
}

getdata(myJsonURL,doSomething);
```

<br>

---

<br>

### Get images from any kind of url
Return the url for an image.
If it is already an image, return the url;
If it is a video, return the url from the thumbnail.

`xpto = imagefromallsources(url);`
<br>

Example:
```js
let photo = imagefromallsources('https://www.youtube.com/watch?v=ZbFATmGhz9k');
```

<br>

---
<br>

### Re-scale

Create a function that recalculates a value in a different scale

`myfunction = rescale([originallimit_1, originallimit_2] , [convertedlimit_1, convertedlimit_2])`

<br>

Example:
```js
const y = rescale([0,1],[50,70]);
let xpto = y(0.5); // = 60
```


<br>
<br>
<br>
<br>
<br>
<br>

## Date functions

<br>

---

<br>

### dayadd

Add days to a string date

```js
xpto = dayadd(originaldate, days);
```
<br>
Example:
```js
let mystringdate = "11/04/2022";
let newdate = dayadd(mystringdate, 7);
```

<br>

---

<br>

### howmanydays

How many days passed between two dates, including the last one

```js
day = howmanydaysincluding(firstdate, seconddate);
```

<br>
Example:
```js
let dayspassed = howmanydaysincluding("11/04/2022", "15/04/2022");
```

<br>
<br>
<br>
<br>
<br>
<br>

## Data filtering

<br>

---

<br>

### Boolean Filter
Create a list array from an old one when their elements have any value on a specific criteria(key)

```js
xpto = bfilter(array, criteria)
```

<br>
Example:

| name  | age | active |
| ----- | --- | ------ |
| John  | 40  | yes    |
| Rick  | 35  |        |
| Peter | 55  | no     |
| Anne  | 40  | &nbsp; |

<br>

```js
let separate = bfilter(oldarray, "active");
```
<br>

separate=

| name  | age | active |
| ----- | --- | ------ |
| John  | 40  | yes    |
| Peter | 55  | no     |


<br>

`bfilter` is equivalent to

```js
let separate = oldarray.filter( (d) => typeof d[criteria] != "undefined" && d[criteria] != null );
```

<br>

---

<br>

### Conditional Filter
Create a list array from an old one when a specific key have a match of a specific value/pattern

```js
xpto = cfilter(array, key, pattern)
```

<br>
Example:

| name  | age | active   |
| ----- | --- | -------- |
| John  | 40  | shure is |
| Rick  | 35  |          |
| Peter | 55  | no       |
| Anne  | 40  | &nbsp;   |

<br>

```js
let separate = cfilter(oldarray, "active", "(.*)is");
```

<br>

separate=

| name | age | active   |
| ---- | --- | -------- |
| John | 40  | shure is |

<br>

`cfilter` is equivalent to

```js
let separate = oldarray.filter( (d) => d[criteria].match(pattern) );
```

<br>

---

<br>

### Sort by alphabetic order
Sort an array in alphabetic order over the values for a specific key

```js
newarray = alphabetic(oldarray, key);
```

<br>
Example:

| name  | age | active   |
| ----- | --- | -------- |
| John  | 40  | shure is |
| Rick  | 35  | &nbsp;   |
| Peter | 55  | no       |
| Anne  | 40  | &nbsp;   |

<br>

```js
let list = alphabetic(oldarray, "name");
```

<br>

list = 

| name  | age | active   |
| ----- | --- | -------- |
| Anne  | 40  | &nbsp;   |
| John  | 40  | shure is |
| Peter | 55  | no       |
| Rick  | 35  | &nbsp;   |

<br>

---

<br>

### Unique function
List of unique values from a criteria (key) in the array

```js
newarray = unique(oldarray, criteria);
```

<br>
Example:

| name  | age | active   |
| ----- | --- | -------- |
| John  | 40  | shure is |
| Rick  | 35  |          |
| Peter | 55  | no       |
| Anne  | 40  | &nbsp;   |

<br>

```js
let list = unique(oldarray, "age");
```

<br>

list=

|     |
| --- |
| 40  |
| 35  |
| 55  |

<br>

---

<br>
### Sort by a list of values
Sort an array using a list of possible values for a specific key

```js
newarray = sortbylist(oldarray, keyvaluesarray, key);
```

<br>
Example:
```js
let disordered = [
              {'fruit': 'orange', 'quantity': 5, 'type': 'B'}, 
              {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
              {'fruit': 'banana', 'quantity': 3, 'type': 'B'},
              {'fruit': 'apple', 'quantity': 10, 'type':'B'},
              {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'}
             ];
```

| fruit      | quantity | type |
| ---------- | -------- | ---- |
| orange     | 5        | B    |
| apple      | 2        | A    |
| banana     | 3        | B    |
| apple      | 10       | B    |
| strawberry | 5        | A    |

<br>

```js
let list = ['strawberry', 'apple'];
```

<br>

|            |
| ---------- |
| strawberry |
| apple      |

<br>

```js
let orders = sortbylist(disordered, list, 'fruit');
```

<br>

orders=

| fruit      | quantity | type |
| ---------- | -------- | ---- |
| strawberry | 5        | A    |
| apple      | 2        | A    |
| apple      | 10       | B    |

<br>

---

<br>
### Extract all Tags
Extract all Tags (words marking some criteria) in an array of objects, in a specific key
of the object

```js
newarray = tags(array, key, separator);
```

<br>
Example:

| Item Name | Type  |
| --------- | ----- |
| Product 1 | A,B,C |
| Prodcut 2 | B     |
| Product 3 | A,C   |
| Product 4 | B,E   |
| Product 5 | A,E,C |

<br>

```js
let alltags = tags(myarray, "Type", ","); 
```

<br>

alltags=

|     |
| --- |
| A   |
| B   |
| C   |
| E   |

<br>

---

<br>

### Shuffle function:
Create a list of numbers without repetition, for random ordering itens of a list

```js
neworderarray = shuffle(maxvalue, listsize);
```

<br>
Example:

| N   | Product   |
| --- | --------- |
| 1   | Product A |
| 2   | Product B |
| 3   | Product C |
| 4   | Product D |
| 5   | Product E |

<br>

```js
let order = suffle(myarray.length, myarray.length); 
```

<br>

order =

|     |
| --- |
| 3   |
| 0   |
| 1   |
| 5   |
| 4   |

<br>

---

<br>

### Select function:
Create a filtered array using a function to filter data

```js
newarray = select(oldarray, function (n, arr, patt) {

  // if(patt.test(arr.valr)) {
  //    n.push(arr);
  // }

}, patt);
```

<br>
*Shortcuts*<br>
`selectp` for patterns<br>
`selecta` for multipattern add<br>
`selecte` for multipattern exclude<br>

<br>
You can create functions as tools for selecting elements in an array<br>
Example using *patterncheck* (one of Select Predefined Tool):

| Name    | Status        | Quantity |
| ------- | ------------- | -------- |
| Peter   | not confirmed | 5        |
| Anne    | confirmed     | 6        |
| Richard | not confirmed | 10       |
| John    | waiting       | 4        |

<br>

```js
let cancel = select(oldarray,patterncheck,/not(.*)/gi);
```

<br>

cancel=

| Name    | Status        | Quantity |
| ------- | ------------- | -------- |
| Peter   | not confirmed | 5        |
| Richard | not confirmed | 10       |

<br>
<br>
<br>
<br>
<br>
<br>

## Select Predefined Tools

Functions to pair with Select Function

<br>

---

<br>

### patterncheck

Uses regex for check
<br><br>
Example

```js
let cancel = select(oldarray,patterncheck,/not(.*)/gi);
let cancel = selectp(oldarray,/not(.*)/gi);
```

<br><br>

---

<br>

### multipatterncheck_add

Uses a string with words separated by space as query, adding every registry where one of them is found<br>
The words can be found in different keys 
<br><br>
Example

```js
let cancel = select(oldarray,multipatterncheck_add,"not Anne 4");
let cancel = selecta(oldarray,"not Anne 4");
```

<br><br>

---

<br>

### multipatterncheck_exclude

Uses a string with words separated by space as query, adding only registries where all of them were found<br>
The words can be found in different keys 
<br><br>
Example

```js
let cancel = select(oldarray,multipatterncheck_exclude,"waiting 4");
let cancel = selecte(oldarry,"waiting 4");
```

<br>
<br>
<br>
<br>
<br>
<br>

## Omnifilter

<br>

---

<br>
Out of the box solution for fuzzy search<Br>
(This is an implementation of something like Observable's Inputs.search)

For json files:

```js
omnifilterfetchdata("https://www.myurl/file.json", "MyInputElement");
```

For csv files:

```js
omnifilterfetchcsvdata("https://www.myurl/file.csv", "MyInputElement");
```

You will need:

- a `<input id='MyInputElement'>` element in your HTML (you can change the id of the element);
- a definition (overwrite)for omnifilter(arr) function, which will update everything in your document with data filtered by what is in the `<input>` element;
- a JSON file in an URL.

arr is the result of the fuzzy search over the JSON data<br>
it is updated at every change (key pressed) in the `<input>` element
<br>
Example:

```html
<input type="text" id="MyInputElement">

<script src="https://data.vercel.app/basics.js"></script>

<script>

omnifilter = function (arr) {
    console.table(arr);
}

omnifilterfetchdata("https://www.myurl/file.json", "MyInputElement");

</script>
```


<br><br><br><br>

<br><br><br><br>
<br><br><br><br>

## DOM extra support

Functions for DOM manipulation.

Load the library direcly from the web:

```html
<script src="https://datat.vercel.app/dommin.js"></script>
```

Or download the file from [github](https://github.com/ranoya/DataT/blob/main/dommin.js).

The reference and examples are also commented in the [source code](https://datat.vercel.app/dom.js).


<br>
<br>
<br>
<br>
<br>
<br>

### Get Element ByAnything

Return a HTML element or an Array of HTML elements in the confluence of one or many properties of the element (tag, id or class) and include `$` and `$$` functions in them for chaining.
    
```js
$("#myid");
$("div #myid");
$(".classA .classB");
$("p .classA .classB");
$("div #myid").$("p")[2].$("a")
$("div #myid").$$("p")[2].$$("a")[0]
```

<br>
Example:

```js
let myelementA = $("#myid");
let myelementB= $("div #myid");
let myelementArrayA = $(".classA .classB");
let myelementArrayB = $("p .classA .classB");
let getelementsinside = $("p .classA .classB")[0].$("a");
```

<br>

---

<br>

### Get Array of Element By Anything

Return (always) an array of HTML elements (even if it's only one) in the confluence of one or many properties of the element (tag, id or class) and include `$` and `$$` functions in them for chaining.

```js
$$("#myid");
$$("div #myid");
$$(".classA .classB");
$$("p .classA .classB");
$$("p .classA .classB")[0].$$("a");
$$("p .classA .classB")[2].$(".classC");
```

<br>
Example:
```js
let myelementA = $$("#myid")[0];
let myelementB = $$("div #myid")[0];
let myelementC = $$(".classA .classB")[5];
let myelementArrayA = $$("p .classA .classB");
let thethrid_p = $$("p")[2];
let thethird_p_links = $$("p")[2].$$("a");
```

<br>

---

<br>
### Array of URL variables

Access URL variable values

```js
https://www.mysite.com/?xpto=valueA&nda=valueB

mydata = $_GET['xpto'];
mydata2 = $_GET['nda'];
```

<br>
Example:
```js
let urldata = $_GET['myURLvar'];
```

<br><br><br><br>

<br><br><br><br>
<br><br><br><br>

## Interface Management

Functions to help manage your visual interface.

Load the library direcly from the web:

```html
<script src="https://datat.vercel.app/screenmin.js"></script>
```

Or download the file from [github](https://github.com/ranoya/DataT/blob/main/screenmin.js).

An example of how to use Interface Management is avaliable [here](https://datat.vercel.app/screenexample.html). See the HTML code of this document on how to use DataT Interface Management functions.

<br>
<br>
<br>
<br>
<br>
<br>

### The main 3 events

There are 3 events continuously managed by DataT Screen:

`onScreen`<br>
Everytime the browser window changes, the `onScreen` function is called;

`onKeys`<br>
Everytime a key or multiple keys are pressed, the `onKeys` function is called;

`onMouse`<br>
Everytime the mouse moves, the `onMouse` function is called;

<br>

You can define the content of these functions to fulfill your needs:

```javascript
onMouse = function (e) {
    console.log(mouseX);
}
```

<br><br>

### System variables

Some useful variables are always been update with system info:

| Variable     | Information                                                      |
| ------------ | ---------------------------------------------------------------- |
| screenWidth  | Horizontal space avaliable in the browser viewport               |
| screenHeight | Vertical space avaliable in the browser viewport                 |
| mouseX       | Horizontal position of the mouse pointer in the browser window   |
| mouseY       | Vertical position of the mouse pointer in the browser window     |
| keymapping   | Array with all the keys been pressed in the keyboard             |
| mobileSize   | `true` if the screen width is less than 600 pixels               |
| badScroll    | `true` if you have bad scrollbars (Windows and Linux scrollbars) |

<br><br>

### cssVar

DataT screen manager philosophy is to relie on CSS variables do the job for you. With `cssVar` you can change or get values of CSS variables.

```javascript
let panelwidth = cssVar("--panel-width");
cssVar("--panel-height").value = "calc(" + mouseY + "px - 100px)";
```

<br><br>

### screen

The `screen()` function let you change some DOM element´s visual aspects, or get their information.

```javascript
screen("#panel").marginRight = "10px";
let PanelTop = screen("#panel").top;
```
<br>
These are the properties:

| Property            | Get/Set/Both | Example                                                                      |
| ------------------- | ------------ | ---------------------------------------------------------------------------- |
| .top                | Both         | screen("#myElementId").top = "10px";                                         |
| .bottom             | Both         | screen("#myElementId").bottom = "10px";                                      |
| .left               | Both         | screen("#myElementId").left = "var(--all-margins, 25px)";                    |
| .right              | Both         | screen("#myElementId").right = "10px";                                       |
| .width              | Both         | screen("#myElementId").width = "50%";                                        |
| .height             | Both         | screen("#myElementId").top = "calc(100vh - 100px)";                          |
| .offsetLeft         | Get only     | oleft = screen("#myElementId").offsetLeft;                                   |
| .offsetRight        | Get only     | oright = screen("#myElementId").offsetRight;                                 |
| .offsetTop          | Get only     | otop = screen("#myElementId").offsetTop;                                     |
| .marginLeft         | Set only     | screen("#myElementId").marginLeft = "10px";                                  |
| .marginRight        | Set only     | screen("#myElementId").marginRight = "10px";                                 |
| .marginLeft         | Set only     | screen("#myElementId").marginLeft = "10px";                                  |
| .marginTop          | Set only     | screen("#myElementId").marginTop = "10px";                                   |
| .marginBottom       | Set only     | screen("#myElementId").marginBottom = "10px";                                |
| .paddingTop         | Set only     | screen("#myElementId").paddingTop = "10px";                                  |
| .paddingLeft        | Set only     | screen("#myElementId").paddingLeft = "10px";                                 |
| .paddingBottom      | Set only     | screen("#myElementId").paddingBottom = "10px";                               |
| .paddingRight       | Set only     | screen("#myElementId")paddingRight = "10px";                                 |
| .display            | Set only     | screen("#myElementId").display = "grid";                                     |
| .position           | Set only     | screen("#myElementId").position = "absolute";                                |
| .border             | Set only     | screen("#myElementId").border = "1px solid var(--my-border-color, red)";     |
| .backgroundColor    | Set only     | screen("#myElementId"). backgroundColor = "#FF0000";                         |
| .color              | Set only     | screen("#myElementId").color = "var(--text-color, #999999)";                 |
| .overflow           | Set only     | screen("#myElementId").overflow = "hidden";                                  |
| .backgroundImage    | Set only     | screen("#myElementId").backgroundImage = "url(https://mysite.com/back.jpg)"; |
| .backgroundRepeat   | Set only     | screen("#myElementId").backgroundRepeat = "no-repeat";                       |
| .backgroundPosition | Set only     | screen("#myElementId").backgroundPosition = "top center";                    |
| .backgroundSize     | Set only     | screen("#myElementId").backgroundSize = "cover";                             |
| .zIndex             | Set only     | screen("#myElementId").zIndex = "5";                                         |

You can also use the `screen()` function as a shortcut to change other things in the DOM Element.

<br>
Change the content of an element with the property `.innerHTML`:

```javascrtipt
screen("#myElementId").innerHTML = `<b>Hello World</b>`;
```

<br>
Add CSS classes with `.addCSS()`:

```javascrtipt
screen("#myElementId").addCSS("OtherClass");
screen("#myElementId").addCSS("AnotherClass");
```

<br>
Remove CSS classes with `.removeCSS()`:

```javascrtipt
screen("#myElementId").removeCSS("OtherClass");
```

<br>
Get the Array of classes of the element, with `.class`:

```javascrtipt
let elClasses = [];
elClasses = screen("#myElementId").class;
screen("#myElementId").removeCSS(elClasses[0]);
```


<br>
<br>
<br>
<br>
<br>
<br>
