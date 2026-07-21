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
                <li><a href="#">About</a></li>
                <li><a href="osds.html">Administrative Concern</a></li>
                <li><a href="#">Curriculum Implementation</a></li>
                <li><a href="sgod.html">School Governance</a></li>
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
        meta: "Announcements • July 20, 2026",
        title: "Official Schedule for Oplan Brigada Eskwela",
        desc: "Our collaborative cleaning, physical repairs, and maintenance program begins next week. Learn how community volunteers can donate equipment or sign up for specific maintenance schedules."
    },
    {
        meta: "Academic Updates • July 12, 2026",
        title: "Pre-Registration and Kindergarten Screening Protocols",
        desc: "Parents of incoming kindergarten learners are requested to review the documentation checklist including PSA birth records and immunization cards before visiting the site."
    },
    {
        meta: "Announcements • July 05, 2026",
        title: "Distribution of Learning Materials and Modules",
        desc: "Schedule for picking up student packets and physical workbooks will be distributed by classroom advisers through your respective group chats next Monday."
    },
    {
        meta: "Events • June 28, 2026",
        title: "General PTA Assembly Meeting",
        desc: "Join us on Zoom or physically at the school gymnasium for our annual planning assembly regarding the security improvements of school facilities."
    },
    {
        meta: "Nutrition • June 20, 2026",
        title: "Launch of School-Based Feeding Program (SBFP)",
        desc: "In cooperation with local health units, the daily supplemental dietary plan kicks off for identified grade-school program beneficiaries."
    },
    {
        meta: "Achievements • June 15, 2026",
        title: "San Roque ES Wins Regional Press Conference Award",
        desc: "Congratulations to our student journalists and trainers for bringing home the top spots in editorial writing and copyreading competitions!"
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

