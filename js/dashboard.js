// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Chart default configuration
  Chart.defaults.font.family = "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  Chart.defaults.color = '#64748B'; // Tailwind text-slate-500
  Chart.defaults.scale.grid.color = '#F1F5F9'; // Tailwind slate-100
  Chart.defaults.plugins.tooltip.backgroundColor = '#1E293B';
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;

  // 1. Monthly Commission Trend (Line Chart)
  const monthlyCtx = document.getElementById('monthlyTrendChart');
  if (monthlyCtx) {
    new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Commission (RM)',
          data: [500000, 750000, 800000, 1000000, 1245780, 850000, 1200000, 800000, 450000, 600000, 800000, 1300000],
          borderColor: '#12B9C3', // Teal primary
          backgroundColor: 'rgba(18, 185, 195, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#12B9C3',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4 // curve
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // We use custom HTML legend
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#64748B',
            titleFont: { size: 12, family: "'Inter', sans-serif", weight: 'normal' },
            bodyColor: '#1E293B',
            bodyFont: { size: 13, family: "'Inter', sans-serif", weight: 'bold' },
            borderColor: '#E2E8F0',
            borderWidth: 1,
            padding: 10,
            boxPadding: 6,
            usePointStyle: true,
            displayColors: true,
            callbacks: {
              title: function(context) {
                return context[0].label + ' 2025';
              },
              label: function(context) {
                return context.formattedValue;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value === 0) return '0';
                return (value / 1000) + 'K';
              },
              maxTicksLimit: 8
            },
            border: { display: false }
          },
          x: {
            grid: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }

  // 2. Top Agents by Commission (Horizontal Bar Chart)
  const agentsCtx = document.getElementById('topAgentsChart');
  if (agentsCtx) {
    new Chart(agentsCtx, {
      type: 'bar',
      data: {
        labels: ['Aiman Rahman', 'Siti Nurhaliza', 'Daniel Wong', 'Farah Izzati', 'Kevin Chang'],
        datasets: [{
          data: [85420, 72310, 65870, 54210, 49860],
          backgroundColor: '#12B9C3',
          borderRadius: 4,
          barThickness: 16
        }]
      },
      options: {
        indexAxis: 'y', // Horizontal
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 80
          }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value === 0) return '0';
                return (value / 1000) + 'K';
              }
            },
            border: { display: false }
          },
          y: {
            grid: { display: false },
            border: { display: false }
          }
        }
      },
      plugins: [{
        afterDraw: function(chart) {
          var ctx = chart.ctx;
          chart.data.datasets.forEach(function(dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
                ctx.fillStyle = '#64748B';
                var fontSize = 12;
                var fontFamily = 'Inter, sans-serif';
                ctx.font = fontSize + "px " + fontFamily;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                var dataString = 'RM ' + dataset.data[index].toLocaleString();
                var position = element.tooltipPosition();
                ctx.fillText(dataString, position.x + 8, position.y);
              });
            }
          });
        }
      }]
    });
  }

  // 3. Top Products by Sales (Horizontal Bar Chart)
  const productsCtx = document.getElementById('topProductsChart');
  if (productsCtx) {
    new Chart(productsCtx, {
      type: 'bar',
      data: {
        labels: ['Medical Plan', 'Investment Link', 'Term Life', 'Critical Illness', 'Personal Accident'],
        datasets: [{
          data: [4250000, 3180000, 2120000, 1540000, 1360000],
          backgroundColor: '#14B8A6', // slightly greener teal
          borderRadius: 4,
          barThickness: 16
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 100
          }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value === 0) return '0';
                return (value / 1000000) + 'M';
              }
            },
            border: { display: false }
          },
          y: {
            grid: { display: false },
            border: { display: false }
          }
        }
      },
      plugins: [{
        afterDraw: function(chart) {
          var ctx = chart.ctx;
          chart.data.datasets.forEach(function(dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
                ctx.fillStyle = '#64748B';
                var fontSize = 12;
                var fontFamily = 'Inter, sans-serif';
                ctx.font = fontSize + "px " + fontFamily;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                var dataString = 'RM ' + dataset.data[index].toLocaleString();
                var position = element.tooltipPosition();
                ctx.fillText(dataString, position.x + 8, position.y);
              });
            }
          });
        }
      }]
    });
  }

  // 4. Approval Status (Doughnut Chart)
  const approvalCtx = document.getElementById('approvalStatusChart');
  if (approvalCtx) {
    new Chart(approvalCtx, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Pending', 'Rejected', 'Returned'],
        datasets: [{
          data: [1245, 256, 98, 364],
          backgroundColor: [
            '#12B9C3', // Teal
            '#F59E0B', // Amber
            '#EF4444', // Red
            '#3B82F6'  // Blue
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%', // makes it thin donut
        plugins: {
          legend: { display: false } // we have custom html legend
        }
      }
    });
  }
});

  // 5. Pagination logic for Low Performance Area / Branch
  const lowPerfTbody = document.querySelector('.dashboard-table tbody');
  const paginationControls = document.querySelectorAll('.table-pagination .page-btn');
  const paginationInfo = document.querySelector('.table-pagination .pagination-info');
  
  if (lowPerfTbody && paginationControls.length > 0) {
    const dummyData = [
      // Page 1
      [
        { id: 1, area: 'Johor Bahru', sales: '320,450', commission: '32,150', policies: 152, agents: 28, target: '▼ -24.6%', perf: 'Poor' },
        { id: 2, area: 'Kota Bharu', sales: '210,320', commission: '21,060', policies: 98, agents: 19, target: '▼ -21.3%', perf: 'Poor' },
        { id: 3, area: 'Sandakan', sales: '180,980', commission: '18,430', policies: 86, agents: 17, target: '▼ -19.8%', perf: 'Poor' },
        { id: 4, area: 'Sibu', sales: '165,750', commission: '16,570', policies: 74, agents: 15, target: '▼ -18.4%', perf: 'Poor' },
        { id: 5, area: 'Labuan', sales: '142,220', commission: '14,220', policies: 62, agents: 12, target: '▼ -17.6%', perf: 'Poor' }
      ],
      // Page 2
      [
        { id: 6, area: 'Miri', sales: '120,000', commission: '12,000', policies: 55, agents: 10, target: '▼ -15.4%', perf: 'Poor' },
        { id: 7, area: 'Alor Setar', sales: '115,400', commission: '11,540', policies: 50, agents: 9, target: '▼ -14.2%', perf: 'Poor' },
        { id: 8, area: 'Kuantan', sales: '105,200', commission: '10,520', policies: 45, agents: 8, target: '▼ -12.1%', perf: 'Poor' },
        { id: 9, area: 'Klang', sales: '98,000', commission: '9,800', policies: 42, agents: 7, target: '▼ -10.5%', perf: 'Poor' },
        { id: 10, area: 'Taiping', sales: '92,500', commission: '9,250', policies: 38, agents: 6, target: '▼ -9.8%', perf: 'Poor' }
      ],
      // Page 3
      [
        { id: 11, area: 'Batu Pahat', sales: '85,000', commission: '8,500', policies: 35, agents: 5, target: '▼ -8.2%', perf: 'Poor' },
        { id: 12, area: 'Kluang', sales: '78,400', commission: '7,840', policies: 30, agents: 4, target: '▼ -7.1%', perf: 'Poor' }
      ]
    ];

    let currentPage = 1;
    const renderTable = (page) => {
      currentPage = page;
      lowPerfTbody.innerHTML = '';
      const data = dummyData[page - 1];
      data.forEach(item => {
        lowPerfTbody.innerHTML += `
          <tr>
            <td>${item.id}</td>
            <td>${item.area}</td>
            <td class="text-right">${item.sales}</td>
            <td class="text-right">${item.commission}</td>
            <td class="text-center">${item.policies}</td>
            <td class="text-center">${item.agents}</td>
            <td class="text-right trend-negative">${item.target}</td>
            <td class="text-center"><span class="badge-poor">${item.perf}</span></td>
          </tr>
        `;
      });
      
      const startInfo = (page - 1) * 5 + 1;
      const endInfo = startInfo + data.length - 1;
      paginationInfo.textContent = `Showing ${startInfo} to ${endInfo} of 12 entries`;

      paginationControls.forEach(btn => btn.classList.remove('active'));
      paginationControls[0].disabled = page === 1;
      paginationControls[4].disabled = page === 3;
      paginationControls[page].classList.add('active');
    };

    paginationControls[0].addEventListener('click', () => { if (currentPage > 1) renderTable(currentPage - 1); });
    paginationControls[1].addEventListener('click', () => renderTable(1));
    paginationControls[2].addEventListener('click', () => renderTable(2));
    paginationControls[3].addEventListener('click', () => renderTable(3));
    paginationControls[4].addEventListener('click', () => { if (currentPage < 3) renderTable(currentPage + 1); });

    // Interactivity for filters
    const monthlyFilter = document.getElementById('monthlyTrendFilter');
    if (monthlyFilter) {
      monthlyFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('monthlyTrendChart');
        if (chart) {
          if (e.target.value === 'Last Year') {
            chart.data.datasets[0].data = [400000, 600000, 750000, 900000, 1100000, 700000, 950000, 850000, 500000, 650000, 700000, 1200000];
          } else {
            chart.data.datasets[0].data = [500000, 750000, 800000, 1000000, 1245780, 850000, 1200000, 800000, 450000, 600000, 800000, 1300000];
          }
          chart.update();
        }
      });
    }

    const agentsFilter = document.getElementById('topAgentsFilter');
    if (agentsFilter) {
      agentsFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('topAgentsChart');
        if (chart) {
          if (e.target.value === 'Last Month') {
            chart.data.labels = ['Kevin Chang', 'Aiman Rahman', 'Farah Izzati', 'Siti Nurhaliza', 'Daniel Wong'];
            chart.data.datasets[0].data = [78000, 65000, 61000, 59000, 42000];
          } else {
            chart.data.labels = ['Aiman Rahman', 'Siti Nurhaliza', 'Daniel Wong', 'Farah Izzati', 'Kevin Chang'];
            chart.data.datasets[0].data = [85420, 72310, 65870, 54210, 49860];
          }
          chart.update();
        }
      });
    }

    const productsFilter = document.getElementById('topProductsFilter');
    if (productsFilter) {
      productsFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('topProductsChart');
        if (chart) {
          if (e.target.value === 'Last Month') {
            chart.data.labels = ['Investment Link', 'Medical Plan', 'Critical Illness', 'Personal Accident', 'Term Life'];
            chart.data.datasets[0].data = [3950000, 3600000, 1800000, 1500000, 1100000];
          } else {
            chart.data.labels = ['Medical Plan', 'Investment Link', 'Term Life', 'Critical Illness', 'Personal Accident'];
            chart.data.datasets[0].data = [4250000, 3180000, 2120000, 1540000, 1360000];
          }
          chart.update();
        }
      });
    }

    const lowPerfFilter = document.getElementById('lowPerfFilter');
    if (lowPerfFilter) {
      lowPerfFilter.addEventListener('change', (e) => {
        if (e.target.value === 'Last Month') {
          dummyData[0] = [
            { id: 1, area: 'Kuching', sales: '280,000', commission: '28,000', policies: 140, agents: 25, target: '▼ -20.1%', perf: 'Poor' },
            { id: 2, area: 'Ipoh', sales: '240,500', commission: '24,050', policies: 110, agents: 22, target: '▼ -18.5%', perf: 'Poor' },
            { id: 3, area: 'Melaka', sales: '195,000', commission: '19,500', policies: 95, agents: 18, target: '▼ -16.2%', perf: 'Poor' },
            { id: 4, area: 'Klang', sales: '170,200', commission: '17,020', policies: 82, agents: 14, target: '▼ -15.4%', perf: 'Poor' },
            { id: 5, area: 'Sandakan', sales: '150,000', commission: '15,000', policies: 68, agents: 11, target: '▼ -14.0%', perf: 'Poor' }
          ];
        } else {
          dummyData[0] = [
            { id: 1, area: 'Johor Bahru', sales: '320,450', commission: '32,150', policies: 152, agents: 28, target: '▼ -24.6%', perf: 'Poor' },
            { id: 2, area: 'Kota Bharu', sales: '210,320', commission: '21,060', policies: 98, agents: 19, target: '▼ -21.3%', perf: 'Poor' },
            { id: 3, area: 'Sandakan', sales: '180,980', commission: '18,430', policies: 86, agents: 17, target: '▼ -19.8%', perf: 'Poor' },
            { id: 4, area: 'Sibu', sales: '165,750', commission: '16,570', policies: 74, agents: 15, target: '▼ -18.4%', perf: 'Poor' },
            { id: 5, area: 'Labuan', sales: '142,220', commission: '14,220', policies: 62, agents: 12, target: '▼ -17.6%', perf: 'Poor' }
          ];
        }
        renderTable(1);
      });
    }

    const lowPerfViewAll = document.getElementById('lowPerfViewAll');
    if (lowPerfViewAll) {
      lowPerfViewAll.addEventListener('click', (e) => {
        e.preventDefault();
        const paginationContainer = document.querySelector('.table-pagination');
        if (paginationContainer) {
          paginationContainer.style.display = 'none';
        }
        lowPerfTbody.innerHTML = '';
        let allData = [];
        dummyData.forEach(pageData => {
          allData = allData.concat(pageData);
        });
        allData.forEach(item => {
          lowPerfTbody.innerHTML += `
            <tr>
              <td>${item.id}</td>
              <td>${item.area}</td>
              <td class="text-right">${item.sales}</td>
              <td class="text-right">${item.commission}</td>
              <td class="text-center">${item.policies}</td>
              <td class="text-center">${item.agents}</td>
              <td class="text-right trend-negative">${item.target}</td>
              <td class="text-center"><span class="badge-poor">${item.perf}</span></td>
            </tr>
          `;
        });
      });
    }

  }
