// Navigation bar effects on scroll:-
window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});


// Website light/dark theme:-
let themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");

    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());
});

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
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    })
});


// Scroll to top button:-
let scrollTopBtn = document.querySelector(".scroll-to-top-btn");
window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

scrollTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


// For projects section:-
// Function to add projects
function addProject(photo, name, description, madeBy, projectId, file) {
    // Template literal for the new project card
    const cardTemplate = `
        <div class="img-card-container" data-name="${name.toLowerCase()}">
            <div class="name">${name}</div>
            <div class="img-card">
                <div class="overlay"></div>
                <div class="info">
                    <h3>${name}</h3>
                    <span>${madeBy}</span>
                </div>
                <img src="${photo}" alt="Project Image">
            </div>
            <div class="projects-modal flex-center">
                <div class="projects-modal-body">
                    <i class="fas fa-times projects-close-btn"></i>
                    <h3>${name}</h3>
                    <div class="img-btn">
                        <img src="${photo}" alt="Project Image">
                        <button class="download-btn" data-project-id="${projectId}">Download</button>
                    </div>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;

    // Insert the new project card into the projects-list container
    const container = document.querySelector('.projects-list');
    container.insertAdjacentHTML('beforeend', cardTemplate);

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

    // Add event listener to the new download button
    const newButton = container.querySelector('.img-card-container:last-child .download-btn');
    newButton.addEventListener('click', () => {
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

async function fetchAndDisplayProjects() {
    try {
        const response = await fetch("../json-data/projects.json");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        data.projects.forEach(project => {
            addProject(project.photo, project.name, project.description, project.madeBy, project.projectId, project.file);
        });
    } catch (err) {
        console.error("There has been a problem with the fetch operation:", err);
    }
}
fetchAndDisplayProjects();

// Function to handle the search
function handleSearch() {
    document.title = "Project-Search | CodeWithReshad";
    const searchTerm = searchInput.value.trim().toLowerCase();
    const projectCards = document.querySelectorAll(".img-card-container");
    let hasMatches = false;

    projectCards.forEach(card => {
        const projectName = card.getAttribute("data-name");
        if (projectName && projectName.includes(searchTerm)) {
            card.style.display = "block";
            hasMatches = true;
        } else {
            card.style.display = "none";
            searchBar.style.marginBottom = "30px";
            searchNone.style.display = "block";
        }
    });

    if (searchTerm) {
        searchBar.style.marginBottom = "30px";

        if (hasMatches) {
            resultQuery.innerHTML = `Results for query: <span class="highlighted-term">${searchInput.value}</span>`;
            resultQuery.style.display = "block";
            searchNone.style.display = "none";
            document.querySelector("footer").style.marginTop = "6em";
        } else {
            resultQuery.innerHTML = `Results for query: <span class="highlighted-term">${searchInput.value}</span>`;
            resultQuery.style.display = "block";
            searchNone.style.display = "block";
            document.querySelector(".flex-start").style.justifyContent = "start";
        }
    } else {
        resultQuery.innerHTML = `Results for query: <span class="highlighted-term">${searchInput.value}</span>`;
        searchBar.style.marginBottom = "30px";
        resultQuery.style.display = "block";
        searchNone.style.display = "none";
    }
}

// Add search functionality to both the button and the Enter key
const searchBar = document.querySelector(".projects .container .search-bar");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const resultQuery = document.getElementById("results-for-query");
const searchNone = document.getElementById("search-none");
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", event => {
    if (event.key == "Enter") {
        handleSearch();
    }
});