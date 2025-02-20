// Language Toggle
document.getElementById('languageToggle').addEventListener('click', function () {
    const elements = document.querySelectorAll('[data-chinese], [data-english]');
    elements.forEach(element => {
        if (element.dataset.chinese) {
            element.textContent = element.dataset.english ? element.dataset.english : element.textContent;
        } else {
            element.textContent = element.dataset.chinese ? element.dataset.chinese : element.textContent;
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