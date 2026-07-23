// Define the pagination function
function pagination() {
    const itemsPerPage = 3;
    const container = document.getElementById("bulletin-container");
    
    // Safety check: if the container doesn't exist on this page, stop running
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
        if (!paginationControls) return;
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

    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navbarHTML;
    }
}

// MOOE CHART
// Reusable Chart Initialization Function
function createExpenseChart(canvasId, titleMonth, customData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d'); // Gets the 2d context for Chart.js
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
                    '#0066cc', // Traveling
                    '#8b1fa3', // Office Supplies
                    '#008a1e', // Water
                    '#ff9900', // Electricity
                    '#e63900', // Telephone
                    '#17a2b8', // Repair & Maintenance
                    '#6c757d', // Janitorial
                    '#008a1e'  // Others
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

document.addEventListener('DOMContentLoaded', () => {
    // Unique data arrays for each month
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

    // Observer to handle both fade-in movement AND chart drawing
    const revealElements = document.querySelectorAll('.chart-card.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    
                    // 1. Trigger CSS fade-in
                    card.classList.add('reveal-active');
                    
                    // 2. Render Chart.js dynamic animation when card scrolls into view
                    const canvas = card.querySelector('canvas');
                    if (canvas && !canvas.dataset.initialized) {
                        const canvasId = canvas.id;
                        // Extract month string from ID (e.g. "expenseChartJanuary" -> "January")
                        const month = canvasId.replace('expenseChart', '');
                        
                        if (monthlyData[month]) {
                            createExpenseChart(canvasId, month, monthlyData[month]);
                            canvas.dataset.initialized = "true"; // Prevents re-rendering
                        }
                    }

                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        Object.keys(monthlyData).forEach(month => {
            createExpenseChart(`expenseChart${month}`, month, monthlyData[month]);
        });
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }
});
