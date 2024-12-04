// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar primera diapositiva
    showSlide(0);
    
    // Configurar controles
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    
    // Crear indicadores de diapositivas
    createDots();
    
    // Configurar teclas de navegación
    document.addEventListener('keydown', handleKeyPress);
});

// Funciones de navegación
function showSlide(n) {
    // Remover clase active de todas las diapositivas
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Actualizar los dots
    updateDots(n);
    
    // Mostrar la diapositiva actual
    slides[n].classList.add('active');
    
    // Actualizar estado de los botones
    updateButtons();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Crear indicadores de diapositivas
function createDots() {
    const dotsContainer = document.getElementById('dots');
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
}

// Actualizar indicadores
function updateDots(n) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === n);
    });
}

// Actualizar estado de botones
function updateButtons() {
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
}

// Manejar eventos de teclado
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
    }
}

// Manejar eventos táctiles para dispositivos móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // mínima distancia para considerar un swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}
