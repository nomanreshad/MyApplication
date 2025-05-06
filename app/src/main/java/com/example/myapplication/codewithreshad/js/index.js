// Navigation bar effects on scroll:-
window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})


// Setup and start animation of sentence:-
let animateSkillsTyped = new Typed('#animate-skills', {
    strings: ['Front-end Developer', 'Software Developer', 'Computer Vision Eng'],
    typeSpeed: 10,
    startDelay: 500,
    backSpeed: 30,
    backDelay: 800,
    smartBackspace: true,
    shuffle: false,
    loop: true,
    loopCount: Infinity,
});
let animateNameTyped = new Typed('#animate-name', {
    strings: ['CodeWithReshad'],
    typeSpeed: 0,
    showCursor: false,
});


// Website light/dark theme:-
let themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");

    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());
})

let getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
let getCurrentIcon = () => themeBtn.classList.contains("sun") ? "sun" : "moon";

let savedTheme = localStorage.getItem("saved-theme");
let savedIcon = localStorage.getItem("saved-icon");

if (savedTheme) {
    document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme");
    themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("sun");
}


// Responsive navigation menu toggle:-
let menuBtn = document.querySelector(".nav-menu-btn");
let closeBtn = document.querySelector(".nav-close-btn");
let navigation = document.querySelector(".navigation");
let navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
})

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
})

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    })
})


// Scroll to top button:-
let scrollTopBtn = document.querySelector(".scroll-to-top-btn");
window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
})

scrollTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})


// Services section - Modal:-
let serviceModals = document.querySelectorAll(".service-modal");
let learnMoreBtns = document.querySelectorAll(".learn-more-btn");
let modalCloseBtns = document.querySelectorAll(".modal-close-btn");

const modal = (modalClick) => {
    serviceModals[modalClick].classList.add("active");
}

learnMoreBtns.forEach((learnMoreBtn, i) => {
    learnMoreBtn.addEventListener("click", () => {
        modal(i);
    })
})

modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        serviceModals.forEach((modalView) => {
            modalView.classList.remove("active");
        });
    })
})


// For projects section:-
// Add projects files links or file here
const projectFiles = {
    "project1": {
        url: "https://github.com/Md-Noman-Hassan-Reshad/TIC_TAC_TOE_IN_PYTHON/archive/refs/heads/main.zip",
        externalLink: null
    },
    "project2": {
        url: 'https://example.com/file2.zip',
        externalLink: null
    },
    "project3": {
        url: 'https://example.com/file3.zip',
        externalLink: null
    }
};

// Function to add a new image card for projects
function addProject(photo, name, description, altText, madeBy, projectId) {
    // Template literal for the new image card
    const cardTemplate = `
        <div class="img-card-container">
            <div class="name">${name}</div>
            <div class="img-card">
                <div class="overlay"></div>
                <div class="info">
                    <h3>${name}</h3>
                    <span>${madeBy}</span>
                </div>
                <img src="${photo}" alt="${altText}">
            </div>
            <div class="projects-modal flex-center">
                <div class="projects-modal-body">
                    <i class="fas fa-times projects-close-btn"></i>
                    <h3>${name}</h3>
                    <div class="img-btn">
                        <img src="${photo}" alt="${altText}">
                        <button class="download-btn" data-project-id="${projectId}">Download</button>
                    </div>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;

    // Insert the new image card into the projects-list container
    const container = document.querySelector('.projects-list');
    container.insertAdjacentHTML('beforeend', cardTemplate);

    // Add event listener to the new download button
    const newButton = container.querySelector('.img-card-container:last-child .download-btn');
    newButton.addEventListener('click', () => {
        const id = newButton.getAttribute('data-project-id');
        const file = projectFiles[id];
        if (file.externalLink) {
            window.open(file.externalLink, "_blank");
        } else {
            downloadFile(file.url);
        }
    });
}

// Download by clicking this button
function downloadFile(fileUrl) {
    let link = document.createElement("a");
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Call the function to add an image card of projects
addProject('images/project1.png', 'Tic-Tac-Toe', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Image description', 'By me', 'project1');
addProject('images/port-img2.jpg', 'UI/UX Design', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Image description', 'By me', 'project2');
addProject('images/port-img3.jpg', 'Branding & Design', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Image description', 'By me', 'project3');


// Portfolio section - Modal
let projectsModals = document.querySelectorAll(".projects-modal");
let imgCards = document.querySelectorAll(".img-card");
let projectsCloseBtns = document.querySelectorAll(".projects-close-btn");

const portfolioModal = (modalClick) => {
    projectsModals[modalClick].classList.add("active");
}

imgCards.forEach((imgCard, i) => {
    imgCard.addEventListener("click", () => {
        portfolioModal(i);
    })
})

projectsCloseBtns.forEach((portfolioCloseBtn) => {
    portfolioCloseBtn.addEventListener("click", () => {
        projectsModals.forEach((portfolioModalModalView) => {
            portfolioModalModalView.classList.remove("active");
        });
    })
})


// Contact section modal:-
let contactModal = document.querySelector(".contact-modal");
// let imgCards = document.querySelectorAll(".img-card");
let contactCloseBtn = document.querySelector(".contact-close-btn");
let button = document.querySelector(".contact-btn");
button.addEventListener("click", () => {
    contactModal.classList.add("active");
})
contactCloseBtn.addEventListener("click", () => {
    contactModal.classList.remove("active");
})
