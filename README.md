# DataT

Guilherme Ranoya, 2021

## What's it?

Small functions to help dealing with data in javascript. Tools for manipulating data in arrays and objects.

## How to use them?

Load the library from the web if you wish:

```html
<script src="https://www.ranoya.com/Assets/JSLibs/DataT/basics.js"></script>
```

The reference and examples are commented in the [source code](https://www.ranoya.com/Assets/JSLibs/DataT/basics.js).

### Fetch function, adapted for Observable

Get a json from a URL

```js
xpto = getdata(myurl);
```

<br>
**Original pure javascript DataT Fetch function:**
```js
getdata(myurl, function(data) {
   // console.table(data);
});
```
<br>

### Date functions

<br>

##### dayadd - add days to a string date

```js
xpto = dayadd(originaldate, days);
```

Example:

```js
mystringdate = "11/04/2022";
newdate = dayadd(mystringdate, 7);
```

<br>
##### howmanydays - how many days passed between two dates, including the last one
```js
day = howmanydaysincluding(firstdate, seconddate);
```

Example:

```js
dayspassed = howmanydaysincluding("11/04/2022", "15/04/2022");
```

### Boolean Filter

Create a list array from an old one when their elements have any value on a specific criteria(key)

```js
xpto = bfilter(array, criteria);
```

<br>
Example:
```js
separate = bfilter(oldarray, "active");
```

### Unique function

List of unique values from a criteria (key) in the array

```js
newarray = unique(oldarray, criteria);
```

<br>

### Sort by a list of values

Sort an array using a list of possible values for a specific key

```js
newarray = sortbylist(oldarray, keyvaluesarray, key);
```

<br>

Example:

```js
disordered = [
  { fruit: "orange", quantity: 5, type: "B" },
  { fruit: "apple", quantity: 2, type: "A" },
  { fruit: "banana", quantity: 3, type: "B" },
  { fruit: "apple", quantity: 10, type: "B" },
  { fruit: "strawberry", quantity: 5, type: "A" },
];

list = ["strawberry", "apple"];

orders = sortbylist(disordered, list, "fruit"); // Array(3):
// [
//  {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'},
//  {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
//  {'fruit': 'apple', 'quantity': 10, 'type':'B'}
// ]
```

<br>

### Extract all Tags

Extract all Tags (words marking some criteria) in an array of objects, in a specific key
of the object

```js
newarray = tags(array, key, separator);
```

<br>
Example:
```js
alltags = tags(myarray, "categories", ","); 
```
<br>

### Select function:

Create a filtered array using a function to filter data

```js
newarray = select(
  oldarray,
  function (n, arr, patt) {
    // if(patt.test(arr.valr)) {
    //    n.push(arr);
    // }
  },
  patt
);
```

<br>
Using Select Predefined Tools:

```
newarray = select(oldarray,patterncheck,/mypattern/gi);

```

<br>

#### Select Predefined Tools

Functions to pair with Select Function
<br>

##### patterncheck

Uses regex for check

## OMNIFILTER

Implementation of Observable's Inputs.search

You will need:

1. a `<input>` element in your HTML;
2. to create an omnifilter(arr) function, which will update everything in your document with data filtered by what is in the `<input>` element;
3. a JSON file in an URL.

Example:

```js
omnifilter = function (arr) {
  console.table(arr);
};

omnifilterfetchdata("https://www.myurl/file.json", "inputelementID");
```

<br>
*arr* is the array created/updated from the JSON file being filtered by `<input>`
