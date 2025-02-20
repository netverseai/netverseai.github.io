// Language Toggle
document.getElementById('languageToggle').addEventListener('click', function () {
    const elements = document.querySelectorAll('[data-chinese], [data-english]');
    elements.forEach(element => {
        if (element.textContent === element.dataset.chinese) {
            element.textContent = element.dataset.english;
        } else {
            element.textContent = element.dataset.chinese;
        }
    });
});

// Set default language based on user's system language
document.addEventListener('DOMContentLoaded', function () {
    const userLang = navigator.language || navigator.userLanguage;
    const elements = document.querySelectorAll('[data-chinese], [data-english]');
    elements.forEach(element => {
        if (userLang.startsWith('zh')) {
            element.textContent = element.dataset.chinese;
        } else {
            element.textContent = element.dataset.english;
        }
    });
});

// Banner Slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll('.banner-content');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}