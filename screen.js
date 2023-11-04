

// Interface Manager

var screenWidth = window.innerWidth; // tamanho da Tela;
var screenHeight = window.innerHeight; // tamanho da Tela;
var mouseX = 0; // posicao do Mouse na Tela;
var mouseY = 0; // posicao do Mouse na Tela;
var keymapping = []; // mapeamento de teclas pressionadas;

/*
    obj('wrap').top // posição em relação ao topo da tela
    obj('wrap').bottom // posição em relação ao fundo da tela
    obj('wrap').left // posição em relação à margem esquerda
    obj('wrap').right // posição em relação à margem direita
    obj('wrap').width // dimensão horizontal do elemento
    obj('wrap').height // dimensão vertical do elemento
    obj('wrap').offsetLeft // distância relativa da margem esquerda do parent
    obj('wrap').offsetTop // distância relativa da margem superior do parent
*/

const screen = function (el) {
    let q = {};
    let rect = document.querySelector(el).getBoundingClientRect();
    q.top = rect.top;
    q.bottom = rect.bottom;
    q.left = rect.left;
    q.right = rect.right;
    q.width = rect.width;
    q.height = rect.height;
    q.offsetLeft = document.querySelector(el).offsetLeft;
    q.offestTop = document.querySelector(el).offsetTop;
    return q;
};

// Faz Scroll na página até um elemento
const goto = function (el) {
    window.scrollTo({
    top: document.getElementById(el).offsetTop - 100,
    behavior: 'smooth',
    });
};

// Atualiza dados dos inputs
const dataupdate = function (arg,inputnumber) {
    let inpt = document.getElementsByTagName('input')[inputnumber];
    inpt.value = arg;
    inpt.dispatchEvent(new Event('input', { bubbles: true }));
};

// Lógica para mouse
const mouselogic = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    onMouse(e);
};

// Lógica para os elementos da interface
const interfacelogic = function (e) {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    onScreen(e);

};

// Lógica para o teclado
const keyboardlogic = function (e) {
    keymapping[e.keyCode] = e.type == 'keydown';

    // Lógica
    if (keymapping[93] && keymapping[91]) {
    // Faz o que com essas teclas?

    }

    onKeys(e);
};

let onScreen = function (e) {
    
    console.log("onScreen()");
    console.log("screenWidth=" + screenWidth + " / " + "screenHeight=" + screenHeight);

}

let onKeys = function (e) {
    
    console.log("onKeys()");
    console.table(keymapping);
}

let onMouse = function (e) {
    
    console.log("onMouse()");
    console.log("mouseX=" + mouseX + " / " + "mouseY=" + mouseY);

}

window.onscroll = interfacelogic;
window.onresize = interfacelogic;
window.onchange = interfacelogic;
window.onmousemove = mouselogic;
window.onkeydown = keyboardlogic;
window.onkeyup = keyboardlogic;
