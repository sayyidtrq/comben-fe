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
      }
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
      }
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
