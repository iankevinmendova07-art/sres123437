// Define the function
function pagination() {
    const itemsPerPage = 3;
    const container = document.getElementById("bulletin-container");
    
    // Safety check: if the container doesn't exist on this page, stop running the function
    if (!container) return;

    const items = container.getElementsByClassName("news-strip");
    const paginationControls = document.getElementById("pagination-controls");
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    function showPage(pageNumber) {
        let start = (pageNumber - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        for (let i = 0; i < items.length; i++) {
            if (i >= start && i < end) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }

        const buttons = paginationControls.getElementsByClassName("page-btn");
        for (let btn of buttons) {
            btn.classList.remove("active");
            if (parseInt(btn.dataset.page) === pageNumber) {
                btn.classList.add("active");
            }
        }
    }

    function setupPagination() {
        paginationControls.innerHTML = "";
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = "page-btn";
            btn.textContent = i;
            btn.dataset.page = i;
            
            btn.addEventListener("click", function() {
                showPage(i);
            });

            paginationControls.appendChild(btn);
        }
    }

    setupPagination();
    showPage(1);
}
function loadNavbar() {
    const navbarHTML = `
     
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="osds.html">Administrative Concern</a></li>
                <li><a href="cid.html">Curriculum Implementation</a></li>
                <li><a href="sgod.html">School Governance</a></li>
                <li><a href="#">About</a></li>
            </ul>
        
    `;

    // Target the element where you want to place the navbar
    const container = document.getElementById('navbar-container');
    
    if (container) {
        container.innerHTML = navbarHTML;
    } else {
        console.error("Navbar container not found! Make sure id='navbar-container' exists.");
    }
}

// Automatically run the function once the page loads
document.addEventListener("DOMContentLoaded", loadNavbar);

// add bulletin post here
// 1. Store your announcement data cleanly in an array
const announcementsData = [
    {
        meta: "Announcement • August 4, 2026",
        title: "School Base Feeding Program Launching", // <-- Added missing double quote
        desc: "School Base Feeding Program will begin on August 3, 2026"
    },
    {
        meta: "Event • July 17, 2026",
        title: "Conduct of School Governance Council",
        desc: "The School Governance Council (SGC) in the Department of Education (DepEd) is a structure designed to empower local stakeholders and foster shared responsibility in school management."
    },
    {
        meta: "Announcement • June 3, 2026",
        title: "Conduct of SPTA Meeting",
        desc: "Join us at the school gymnasium for our annual planning assembly regarding the security improvements of school facilities."
    },
    {
        meta: "Announcements • June 12, 2026",
        title: "Orientation of Trimester System",
        desc: "Transitioning public schools from the traditional four-quarter system to a trimester structure."
    }
];

// 2. Function to load and render the updates
function loadBulletin() {
    const container = document.getElementById('bulletin-container');
    
    if (!container) {
        console.error("Bulletin container not found!");
        return;
    }

    // Loop through the data array and build the HTML layout string
    const htmlContent = announcementsData.map(item => `
        <div class="news-strip">
            <div class="news-meta">${item.meta}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `).join(''); // Combine the generated items into one long string

    // Inject the generated HTML elements into the container
    container.innerHTML = htmlContent;
}

// Run the script automatically once the DOM tree is ready
document.addEventListener("DOMContentLoaded", loadBulletin);

