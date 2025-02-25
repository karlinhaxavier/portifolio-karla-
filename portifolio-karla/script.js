function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

// Typewriter Effect

const texts = [
    "uma ARQUITETA JAVA",
    "uma Desenvolvedora Backend",
    "uma Gestora de Projetos"
]

let speed = 80; // Aumentando um pouco a velocidade
let pauseTime = 2000; // Tempo de pausa entre os textos
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, pauseTime)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Função para alternar o tamanho da fonte
let fontSizeIncreased = false;

function toggleFontSize() {
    const body = document.body;
    if (!fontSizeIncreased) {
        body.style.fontSize = '120%';
        fontSizeIncreased = true;
    } else {
        body.style.fontSize = '100%';
        fontSizeIncreased = false;
    }
}

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');
    
    // Alterna a classe do tema
    body.classList.toggle('light-theme');
    
    // Alterna o ícone
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Salva a preferência do usuário
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Carrega o tema salvo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

window.onload = function() {
    typeWriter();
}
