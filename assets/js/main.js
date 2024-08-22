/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

// Get all modals
var modals = document.querySelectorAll('.modal');

// Get all close buttons
var closeBtns = document.querySelectorAll('.close');

// // Open modal when image is clicked
// document.querySelectorAll('.work__img').forEach((img, index) => {
//     img.addEventListener('click', function (e) {
//         e.preventDefault();
//         modals[index].style.display = "block";
//     });
// });

// // Close modal when close button is clicked
// closeBtns.forEach((btn, index) => {
//     btn.addEventListener('click', function () {
//         modals[index].style.display = "none";
//     });
// });

// Open modal when image is clicked
document.querySelectorAll('.work__img').forEach((img, index) => {
    img.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        const modal = modals[index];
        modals[index].style.display = "block";
        setTimeout(() => modal.classList.add('show'), 10); // Add show class with a slight delay
    });
});

// Close modal when close button is clicked
closeBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        const modal = modals[index];
        document.body.style.overflow = '';

        modal.classList.remove('show');
        setTimeout(() => modal.style.display = "none", 500); // Delay hiding to allow animation to finish
    });
});


// Close modal when clicking outside of modal content
window.addEventListener('click', function (event) {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';

            setTimeout(() => modal.style.display = "none", 500);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const pencilContainer = document.querySelector(".container");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pencilContainer.style.animation = "pencil 3s ease-in-out";
            } else {
                pencilContainer.style.animation = "none";
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(pencilContainer);
});


$(document).ready(function () {
    $("#form_submit").submit(function (e) {
        e.preventDefault();

        var formDataArray = $(this).serializeArray();
        var formDataObj = {};
        $.each(formDataArray, function (i, field) {
            formDataObj[field.name] = field.value;
        });

        fetch("http://127.0.0.1:8000/emailer/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formDataObj.name,
                email: formDataObj.email,
                message: formDataObj.message,
            })
        });
    });
});

