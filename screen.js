

// Interface Manager

var screenWidth = window.innerWidth; // tamanho da Tela;
var screenHeight = window.innerHeight; // tamanho da Tela;
var mouseX = 0; // posicao do Mouse na Tela;
var mouseY = 0; // posicao do Mouse na Tela;
var keymapping = []; // mapeamento de teclas pressionadas;
var mobileSize = window.innerWidth < 650;
var badScroll = (window.navigator.platform.toString().indexOf("Win") >= 0 || window.navigator.platform.toString().indexOf("Linux") >= 0);


const screen = function (el) {

    let elemento = "";
    if (typeof el == "string") {
        elemento = document.querySelector(el);
    } else {
        elemento = el;
    }

    let q = {
        rect: elemento.getBoundingClientRect(),
        itself: elemento,
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
        },
        set marginLeft(v) {
            this.itself.style.marginLeft = v;
        },
        set marginRight(v) {
            this.itself.style.marginRight = v;
        },
        set marginTop(v) {
            this.itself.style.marginTop = v;
        },
        set marginBottom(v) {
            this.itself.style.marginBottom = v;
        },
        set paddingTop(v) {
            this.itself.style.paddingTop = v;
        },
        set paddingLeft(v) {
            this.itself.style.paddingLeft = v;
        },
        set paddingBottom(v) {
            this.itself.style.paddingBottom = v;
        },
        set paddingRight(v) {
            this.itself.style.paddingRight = v;
        },
        set display(v) {
            this.itself.style.display = v;
        },
        set position(v) {
            this.itself.style.position = v;
        },
        set border(v) {
            this.itself.style.border = v;
        },
        set backgroundColor(v) {
            this.itself.style.backgroundColor = v;
        },
        set color(v) {
            this.itself.style.color = v;
        },
        set overflow(v) {
            this.itself.style.overflow = v;
        },
        set backgroundImage(v) {
            this.itself.style.backgroundImage = v;
        },
        set backgroundRepeat(v) {
            this.itself.style.backgroundRepeat = v;
        },
        set backgroundPosition(v) {
            this.itself.style.backgroundPosition = v;
        },
        set backgroundSize(v) {
            this.itself.style.backgroundSize = v;
        },
        set zIndex(v) {
            this.itself.style.zIndex = v;
        },
        set innerHTML(v) {
            this.itself.innerHTML = v;
        }
    };
    
    return q;
};

// Captura ou define valor de variáveis CSS
const cssv = function (v) {
    
    let q = {
        set value(str) { 
            document.documentElement.style.setProperty(v,str)
        },
        get value() {
            return getComputedStyle(document.documentElement)
    .getPropertyValue(v);
        }
    }

    return q;

}

// Adiciona ou remove classes CSS
const css = function (el) {
    
    let elemento = "";
    if (typeof el == "string") {
        elemento = document.querySelector(el);
    } else {
        elemento = el;
    }

    let q = {
        itself: elemento,
        set add(v) {
            this.itself.classList.add(v);
        },
        set remove(v) {
            this.itself.classList.remove(v);
        },
        get classes() {
            return this.itself.classList;
        }
    }

    return q;
}

// Faz Scroll na página até um elemento
const goto = function (el) {
    
    let elemento = "";
    if (typeof el == "string") {
        elemento = document.querySelector(el);
    } else {
        elemento = el;
    }

    window.scrollTo({
    top: elemento.offsetTop - 100,
    behavior: 'smooth',
    });
};

// Atualiza dados dos inputs
const input = function (el) {
    
    let elemento = "";
    if (typeof el == "string") {
        elemento = document.querySelector(el);
    } else {
        elemento = el;
    }
    
    let q = {
        itself: elemento,
        set value(str) {
            this.itself.value = str;
            this.itself.dispatchEvent(new Event('input', { bubbles: true }))
        },
        get value() {
            return this.itself.value;
        }
    }

    return q;
    
}

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
    mobileSize = window.innerWidth < 650;

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
