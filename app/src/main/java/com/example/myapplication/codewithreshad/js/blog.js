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


// Function to add blogs:-
async function addBlog(title, blogContent) {
    // Template literal for the new blog card
    const cardTemplate = `
            <div class="get-in-touch img-card-container" data-name="${title.toLowerCase()}" id="contact">
                <div class="container">
                    <div class="content">
                        <div class="contact-card blog-card">
                            <div class="blog-title">
                                <h2>${title}</h2>
                                <div class="title-info">
                                    <a href="../index.html" class="owner-img">
                                        <img src="../images/reshad.png" alt="CWR">
                                    </a>
                                    <div class="ob">
                                        <a href="../index.html" class="owner-name">Noman Hassan Reshad</a>
                                        <span class="blog-date">· March 23, 2024</span>
                                    </div>
                                </div>
                            </div>
                            <div class="full-blog">${blogContent}</div>
                            <div class="contact-btn read-more-btn">
                                <button href="#" class="btn read-more">Read more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Insert the new blog card into the projects-list container
    const container = document.querySelector(".blogs-list");
    container.insertAdjacentHTML("beforeend", cardTemplate);

    // Add the event listener for blogs read more/show less button
    const newBlogCard = container.lastElementChild.querySelector(".blog-card");
    const button = newBlogCard.querySelector(".read-more");
    const fullBlog = newBlogCard.querySelector(".full-blog");

    button.addEventListener("click", () => {
        if (button.textContent === "Read more") {
            fullBlog.style.webkitLineClamp = "unset";
            button.textContent = "Show less";
        } else {
            fullBlog.style.webkitLineClamp = "3";
            button.textContent = "Read more";
        }
    });
}

async function fetchAndDisplayBlogs() {
    try {
        const response = await fetch("../json-data/blogs.json");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        data.blogs.forEach(blog => {
            addBlog(blog.title, blog.content);
        });
    } catch (err) {
        console.error("There has been a problem with the fetch operation:", err);
    }
}
fetchAndDisplayBlogs();

// Function to handle the search
function handleSearch() {
    document.title = "Blog-Search | CodeWithReshad";
    const searchTerm = searchInput.value.trim().toLowerCase();
    const projectCards = document.querySelectorAll(".img-card-container");
    const heading = document.querySelector(".blogs .content h1");
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
            heading.style.display = "none";
        }
    } else {
        resultQuery.innerHTML = `Results for query: <span class="highlighted-term">${searchInput.value}</span>`;
        searchBar.style.marginBottom = "30px";
        resultQuery.style.display = "block";
        searchNone.style.display = "none";
    }
}

// Add search functionality to both the button and the Enter key
const searchBar = document.querySelector(".blogs .container .search-bar");
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