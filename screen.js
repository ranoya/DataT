

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

    let q = {
        rect: document.querySelector(el).getBoundingClientRect(),
        itself: document.querySelector(el),
        get top() { 
            return this.rect.top;
        },
        get bottom() { 
            return this.rect.bottom;
        },
        get left() { 
            return this.rect.left;
        },
        get right() { 
            return this.rect.right;
        },
        get width() { 
            return this.rect.width;
        },
        get height() { 
            return this.rect.height;
        },
        get offsetLeft() { 
            return this.itself.offsetLeft
        },
        get offsetTop() { 
            return this.itself.offsetTop
        },
        set top(v) {
            this.itself.style.top = v;
        },
        set bottom(v) {
            this.itself.style.bottom = v;
        },
        set left(v) {
            this.itself.style.left = v;
        },
        set right(v) {
            this.itself.style.right = v;
        },
        set width(v) {
            this.itself.style.width = v;
        },
        set height(v) {
            this.itself.style.height = v;
        }

    };
    
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
