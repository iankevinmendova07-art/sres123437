// Fixed missing quote error in title below:
const announcementsData = [
    {
        meta: "Announcement • August 3, 2026",
        title: "School Base Feeding Program Launching",
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

function loadBulletin() {
    const container = document.getElementById('bulletin-container');
    if (!container) return;

    const htmlContent = announcementsData.map(item => `
        <div class="news-strip">
            <div class="news-meta">${item.meta}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `).join('');

    container.innerHTML = htmlContent;
}
// Consolidated DOMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar();
    loadBulletin();
    pagination(); // Loaded after loadBulletin so items exist
    initExpenseChart(); // Initialize chart
});