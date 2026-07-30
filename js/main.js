// ==========================================
// 1. NAVBAR LOADER
// ==========================================
function loadNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    container.innerHTML = `
        <ul>
            <li><a href="index.html" class="active">Home</a></li>
            <li><a href="osds.html">Administrative Concern</a></li>
            <li><a href="cid.html">Curriculum Implementation</a></li>
            <li><a href="sgod.html">School Governance</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" aria-expanded="false">Innovation</a>
                <ul class="dropdown-menu">
                    <li><a href="#">Online School Based Feeding Program</a></li>
                    <li><a href="#">Supply Management System</a></li>
                </ul>
            </li>
            <li><a href="#">About</a></li>
        </ul>
    `;

    const dropdowns = container.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const shouldOpen = !dropdown.classList.contains('open');

            dropdowns.forEach(item => {
                item.classList.remove('open');
                const itemToggle = item.querySelector('.dropdown-toggle');
                if (itemToggle) itemToggle.setAttribute('aria-expanded', 'false');
            });

            if (shouldOpen) {
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        };
    });

    if (!document.body.dataset.navCloseBound) {
        document.body.dataset.navCloseBound = 'true';
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ==========================================
// 2. PAGINATION
// ==========================================
function pagination() {
    const container = document.getElementById("bulletin-container");
    if (!container) return;

    const itemsPerPage = 3;
    const items = container.getElementsByClassName("news-strip");
    const paginationControls = document.getElementById("pagination-controls");
    
    if (items.length === 0) return;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(pageNumber) {
        let start = (pageNumber - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        for (let i = 0; i < items.length; i++) {
            items[i].style.display = (i >= start && i < end) ? "block" : "none";
        }

        if (paginationControls) {
            const buttons = paginationControls.getElementsByClassName("page-btn");
            for (let btn of buttons) {
                btn.classList.remove("active");
                if (parseInt(btn.dataset.page) === pageNumber) {
                    btn.classList.add("active");
                }
            }
        }
    }

    function setupPagination() {
        if (!paginationControls) return;
        paginationControls.innerHTML = "";
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = "page-btn";
            btn.textContent = i;
            btn.dataset.page = i;
            btn.addEventListener("click", () => showPage(i));
            paginationControls.appendChild(btn);
        }
    }

    setupPagination();
    showPage(1);
}

// ==========================================
// 3. HERO SLIDER
// ==========================================
const heroSlides = [
    {
        image: "img/hero1.jpg",
        alt: "School Activity 1",
        caption: "School Governance Council Election"
    },
    {
        image: "img/hero2.jpg",
        alt: "School Activity 2",
        caption: "OPCRF 2025 VALIDATION"
    },
    {
        image: "img/hero3.jpg",
        alt: "School Activity 3",
        caption: "Serving Every one in Devotion to Christ (SEED) Partnerships"
    },
    {
        image: "img/hero4.jpg",
        alt: "School Activity 4",
        caption: "School Personnel Meeting"
    }
];

function renderHeroSlider() {
    const sliderContainer = document.getElementById("heroSlider");
    if (!sliderContainer) return;

    const slidesToRender = [...heroSlides, heroSlides[0]];
    sliderContainer.innerHTML = slidesToRender.map(slide => `
        <div class="slide">
            <img src="${slide.image}" alt="${slide.alt}">
            <span class="slide-caption">${slide.caption}</span>
        </div>
    `).join('');
}

// ==========================================
// 4. MOOE CHART FUNCTIONS
// ==========================================
function createExpenseChart(canvasId, titleMonth, customData) {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js library is missing.');
        return;
    }

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Traveling Expenses - Local',
                'Office Supplies Expenses',
                'Water Expenses',
                'Electricity Expenses',
                'Telephone Expenses',
                'Repair & Maintenance',
                'Janitorial Service',
                'Others'
            ],
            datasets: [{
                label: `Expenses for ${titleMonth}`,
                data: customData,
                backgroundColor: [
                    '#0066cc', '#8b1fa3', '#008a1e', '#ff9900',
                    '#e63900', '#17a2b8', '#6c757d', '#008a1e'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 12,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: false,
                duration: 1200,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                        padding: 10,
                        boxWidth: 12,
                        font: { size: 11 },
                        filter: function(item, chartData) {
                            return chartData.datasets[0].data[item.index] > 0;
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const val = context.parsed;
                            const percentage = total > 0 ? ((val / total) * 100).toFixed(1) + '%' : '0%';
                            return ` ${context.label}: ${percentage}`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    font: { weight: 'bold', size: 11 },
                    formatter: (value, ctx) => {
                        const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        if (total === 0) return '';
                        const percentage = (value / total) * 100;
                        return percentage < 5 ? '' : percentage.toFixed(1) + '%';
                    }
                }
            }
        }
    });
}

// ==========================================
// 5. DOM CONTENT LOADED INITIALIZER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Isolated executions so an error in one feature doesn't stop the others
    try { loadNavbar(); } catch (e) { console.error('Navbar error:', e); }
    try { initBulletin(); } catch (e) { console.error('Bulletin error:', e); }
    try { renderHeroSlider(); } catch (e) { console.error('Hero Slider error:', e); }

    const monthlyData = {
        'January':   [5000.0, 16845.0, 0.0, 6740.83, 0.0,  14510.0,  11500.0, 11037.0],
        'February':  [0.0, 28605.0, 0.0, 3474.62, 0.0, 10243.0,  11500.0,  18859.0],
        'March':     [0.0, 22389.19, 0.0, 4154.06, 0.0,  15890.30, 11500.0,  17152.0],
        'April':     [0.0, 11414.0, 0.0, 1795.71, 0.0, 17585.30,  11500.0,  19526.0],
        'May':       [0.0, 0.0, 0.0, 1189.53, 0.0, 12920.0, 11500.0,  30300.0],
        'June':      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'July':      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'August':    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'September': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'October':   [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'November':  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        'December':  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    };

    const revealElements = document.querySelectorAll('.chart-card.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('reveal-active');
                    
                    const canvas = card.querySelector('canvas');
                    if (canvas && !canvas.dataset.initialized) {
                        const month = canvas.id.replace('expenseChart', '');
                        if (monthlyData[month]) {
                            createExpenseChart(canvas.id, month, monthlyData[month]);
                            canvas.dataset.initialized = "true";
                        }
                    }
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        Object.keys(monthlyData).forEach(month => {
            createExpenseChart(`expenseChart${month}`, month, monthlyData[month]);
        });
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }
});