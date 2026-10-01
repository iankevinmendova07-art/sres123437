const announcementsData = [
    {
        meta: "Announcement • September 11, 2026",
        title: "Conduct of Inset 2026",
        desc: "DepEd INSET 2026: A dedicated professional development program designed to enhance teaching strategies, foster digital innovation, and strengthen instructional practices to support learner success."
    },
     {
        meta: "Announcement • August 25, 2026",
        title: "Conduct of Attack Drill Exercise",
        desc: "A practical safety drill aimed at training personnel and participants to react swiftly, follow lockdown and evacuation procedures, and maintain safety in an unexpected emergency."
    },
    {
        meta: "Announcement • August 17, 2026",
        title: "Start of Feeding Program on August 17, 2026",
        desc: "The Feeding Program officially kicks off on August 17, 2026. This initiative aims to improve health and nutrition by providing fresh, balanced, and nourishing meals to participants, helping build a stronger, healthier communit."
    },  
    {
        meta: "Announcement • July 28, 2026",
        title: "ReMANCOM Hosted by Catbalogan City Division",
        desc: "The Regional Management Committee (ReMANCOM) is a gathering of key education leaders and stakeholders from various regions to discuss and strategize on the implementation of educational policies, programs, and initiatives."
    },
    {
        meta: "Announcement • July 28, 2026",
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

function initBulletin() {
    if (window.__sresBulletinInitialized) return;
    window.__sresBulletinInitialized = true;

    loadBulletin();
    if (typeof pagination === "function") pagination();
}